import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { spawn } from "child_process";
import { stdin } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const spawnChildProcess = async (args) => {
  const scriptFile = "script.js";
  const options = {
    cwd: join(__dirname, "./files"),
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  };
  const cp = spawn(process.argv[0], [scriptFile, ...args], options);

  console.log("ipc connected >", cp.connected, "\n");

  stdin.on("data", (data) => {
    cp.send(data);
  });

  cp.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  cp.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  cp.on("exit", (code) => {
    console.log(`Child exited with code ${code}`);
    process.exit(0);
  });
};

// Read args from cli
// const args = process.argv.slice(2);

// Read args from variable
const args = ["--arg1", "--arg2"];

spawnChildProcess(args);
