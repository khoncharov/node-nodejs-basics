import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fsPromise from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const remove = async () => {
  const folder = "files";
  const fileName = "fileToRemove.txt";
  try {
    const filesList = await fsPromise.readdir(join(__dirname, folder));
    if (filesList.every((item) => item !== fileName)) {
      throw new Error("Target file doesn't exist");
    }
    await fsPromise.unlink(join(__dirname, folder, fileName));
  } catch (error) {
    console.error("FS operation failed");
  }
};

remove();
