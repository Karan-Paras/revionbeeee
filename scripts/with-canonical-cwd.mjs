import { spawn } from "node:child_process";
import { realpathSync } from "node:fs";

const [, , command, ...args] = process.argv;

if (!command) {
  console.error("Usage: node scripts/with-canonical-cwd.mjs <command> [...args]");
  process.exit(1);
}

const canonicalCwd = realpathSync.native(process.cwd());

const child = spawn(command, args, {
  cwd: canonicalCwd,
  env: {
    ...process.env,
    INIT_CWD: canonicalCwd,
    PWD: canonicalCwd,
  },
  shell: process.platform === "win32",
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`${command} exited with signal ${signal}`);
    process.exit(1);
  }

  process.exit(code ?? 0);
});
