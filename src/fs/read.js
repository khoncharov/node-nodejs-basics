import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fsPromise from "fs/promises";
import { stdout } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const read = async () => {
  const folder = "files";
  const fileName = "fileToRead.txt";
  const options = {
    encoding: "utf-8",
  };
  try {
    const content = await fsPromise.readFile(join(__dirname, folder, fileName), options);
    stdout.write(content.toString() + "\n");
  } catch (error) {
    console.error("FS operation failed");
  }
};

read();
