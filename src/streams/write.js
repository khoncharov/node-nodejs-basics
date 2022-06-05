import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { open } from "fs/promises";
import { stdin } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const write = async () => {
  const folder = "files";
  const targetFile = "fileToWrite.txt";
  const fd = await open(join(__dirname, folder, targetFile), "w");
  const stream = fd.createWriteStream();
  stream.on("error", (error) => console.error("Error", error.message));

  stdin.on("data", (chunk) => {
    stream.write(chunk);
    process.exit();
  });
};

write();
