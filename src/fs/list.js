import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fsPromise from "fs/promises";
import { stdout } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const list = async () => {
  const sourceDir = "files";
  try {
    // check if source folder exists
    const filesList = await fsPromise.readdir(join(__dirname, sourceDir));
    // print to console
    stdout.write(filesList.toString() + "\n");
  } catch (error) {
    console.error("FS operation failed");
  }
};

list();
