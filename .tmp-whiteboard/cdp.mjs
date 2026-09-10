import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    ws.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        clearTimeout(pending.timeout);
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
        else pending.resolve(message.result);
      } else {
        this.events.push(message);
      }
    });
  }

  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", reject, { once: true });
    });
    return new Cdp(ws);
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP ${method} timed out`));
      }, 30_000);
      this.pending.set(id, { resolve, reject, timeout });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
      userGesture: true,
    });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    }
    return result.result.value;
  }

  async waitFor(expression, timeoutMs = 45_000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await this.evaluate(expression)) return;
      await pause(150);
    }
    throw new Error(`Page condition timed out: ${expression}`);
  }

  errors() {
    return this.events.flatMap((event) => {
      if (event.method === "Runtime.exceptionThrown") {
        const details = event.params.exceptionDetails;
        return [{ type: "exception", text: details.exception?.description || details.text }];
      }
      if (event.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(event.params.type)) {
        return [{
          type: event.params.type,
          text: event.params.args.map((arg) => String(arg.value ?? arg.description ?? arg.type)).join(" ").slice(0, 4_000),
        }];
      }
      return [];
    });
  }
}

export async function openBrowser({ width = 1280, height = 800 } = {}) {
  const profile = path.join(workspace, ".tmp-whiteboard", `edge-profile-${process.pid}-${Date.now()}`);
  await mkdir(profile, { recursive: true });
  const child = spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", [
    "--headless=new", "--disable-gpu", "--remote-debugging-port=0",
    "--no-first-run", "--no-default-browser-check", "--disable-background-networking",
    "--disable-component-update", "--disable-default-apps", "--disable-sync",
    "--disable-crash-reporter", `--user-data-dir=${profile}`, "about:blank",
  ], { windowsHide: true, stdio: ["ignore", "ignore", "pipe"] });
  let launchStderr = "";
  child.stderr.on("data", (data) => { launchStderr = (launchStderr + data.toString()).slice(-4_000); });
  let launchError;
  child.on("error", (error) => { launchError = error; });
  let port;
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (launchError) throw launchError;
    try {
      port = (await readFile(path.join(profile, "DevToolsActivePort"), "utf8")).split(/\r?\n/)[0];
      if (port) break;
    } catch {}
    await pause(100);
  }
  if (!port) {
    child.kill();
    throw new Error(`Edge did not expose its isolated DevTools port (exit ${child.exitCode}): ${launchStderr}`);
  }
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find((entry) => entry.type === "page");
  const page = await Cdp.connect(target.webSocketDebuggerUrl);
  await Promise.all([page.send("Page.enable"), page.send("Runtime.enable"), page.send("Network.enable")]);
  await page.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  return {
    page,
    profile,
    async close() {
      try { await page.send("Browser.close"); } catch {}
      page.ws.close();
      if (child.exitCode === null) child.kill();
    },
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [url = "about:blank", expressionFile, screenshotFile] = process.argv.slice(2);
  const browser = await openBrowser();
  try {
    await browser.page.send("Page.navigate", { url });
    await browser.page.waitFor("document.readyState === 'complete'");
    await pause(1_000);
    const expression = expressionFile
      ? await readFile(path.resolve(expressionFile), "utf8")
      : "({ title: document.title, body: document.body.innerText.slice(0, 8000) })";
    const result = await browser.page.evaluate(expression);
    if (screenshotFile) {
      const screenshot = await browser.page.send("Page.captureScreenshot", { format: "png" });
      await writeFile(path.resolve(screenshotFile), Buffer.from(screenshot.data, "base64"));
    }
    console.log(JSON.stringify({ result, errors: browser.page.errors() }, null, 2));
  } finally {
    await browser.close();
  }
}
