import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fsPromise from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const rename = async () => {
  try {
    const folder = "files";
    const oldName = "wrongFilename.txt";
    const newName = "properFilename.md";
    const filesList = await fsPromise.readdir(join(__dirname, folder));
    if (filesList.every((item) => item !== oldName)) {
      throw new Error("Old file doesn't exist");
    }
    if (filesList.includes(newName)) {
      throw new Error("New file exists");
    }
    fsPromise.rename(join(__dirname, folder, oldName), join(__dirname, folder, newName));
  } catch (error) {
    console.error("FS operation failed");
  }
};

rename();
