import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { runInThisContext } from "node:vm";
import { afterEach, describe, expect, it, vi } from "vitest";

const appRequire = createRequire(import.meta.url);
const loader = appRequire("./whiteboard-react-loader.cjs");
const sdkPath = appRequire.resolve("white-web-sdk");
const sdkRequire = createRequire(sdkPath);

function transform(
  resourcePath: string,
  source = readFileSync(resourcePath, "utf8")
) {
  return loader.call(
    { resourcePath, addDependency: vi.fn() },
    source
  ) as string;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("whiteboard renderer isolation", () => {
  it("resolves the SDK's React imports to its installed renderer instead of Next's React", () => {
    const source = readFileSync(sdkPath, "utf8");
    expect(source).toContain('require("react-dom")');
    const output = transform(sdkPath);
    expect(output).not.toMatch(/require\(["']react(?:-dom)?["']\)/);

    for (const dependency of ["react", "react-dom"]) {
      const rewritten = transform(sdkPath, `require("${dependency}")`);
      const request = JSON.parse(rewritten.slice(8, -1));
      expect(sdkRequire.resolve(request)).toBe(sdkRequire.resolve(dependency));
      expect(sdkRequire(request).version).toMatch(/^16\./);
      expect(appRequire(dependency).version).toMatch(/^19\./);
    }
  });

  it("renders, updates hooks, and unmounts with Next's bare React alias in place", () => {
    const domPath = sdkRequire.resolve("react-dom");
    const rendererPath = `${dirname(domPath)}/cjs/react-dom.development.js`;
    const rendererRequire = createRequire(rendererPath);
    // Simulate the App Router: bare React requests resolve to the app's React 19.
    // The loader must keep the private renderer on the SDK's matching React 16.
    const nextRequire = (request: string) =>
      request === "react" ? appRequire("react") : rendererRequire(request);
    const rendererModule = { exports: {} as ReturnType<typeof sdkRequire> };
    const evaluate = runInThisContext(
      `(function(require, module, exports) { ${transform(rendererPath)}\n})`
    );
    evaluate(nextRequire, rendererModule, rendererModule.exports);

    const legacyReact = sdkRequire("react");
    const renderer = rendererModule.exports;
    const container = document.createElement("div");
    document.body.append(container);
    const cleanup = vi.fn();
    function DrawingTool() {
      const [tool, setTool] = legacyReact.useState("pencil");
      legacyReact.useLayoutEffect(() => cleanup, []);
      return legacyReact.createElement(
        "button",
        { onClick: () => setTool("eraser") },
        tool
      );
    }

    renderer.render(legacyReact.createElement(DrawingTool), container);
    expect(container.textContent).toBe("pencil");
    container.querySelector("button")!.click();
    expect(container.textContent).toBe("eraser");
    expect(renderer.unmountComponentAtNode(container)).toBe(true);
    expect(container.childElementCount).toBe(0);
    expect(cleanup).toHaveBeenCalledOnce();
    expect(appRequire("react").version).toMatch(/^19\./);
  });
});
