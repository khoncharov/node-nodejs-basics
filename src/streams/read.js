import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { open } from "fs/promises";
import { stdout } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const read = async () => {
  const folder = "files";
  const sourceFile = "fileToRead.txt";
  const fd = await open(join(__dirname, folder, sourceFile), "r"); // 'r' - default
  const stream = fd.createReadStream();
  let data = "";
  stream.on("data", (chunk) => (data += chunk));
  stream.on("end", () => stdout.write(data + "\n"));
  stream.on("error", (error) => console.error("Error", error.message));
};

read();
