import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { mkdir, readdir, copyFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const copy = async () => {
  const sourceDir = "files";
  const targetDir = "files_copy";

  try {
    // check if source folder exists
    await readdir(join(__dirname, sourceDir));

    // make files folder_copy with flag recursive false (default) (err if exists)
    await mkdir(join(__dirname, targetDir), { recursive: false });

    // make list of Dirent obj
    const fileList = await readdir(join(__dirname, sourceDir), { withFileTypes: true });

    // copy content
    fileList.forEach(async (item) => {
      if (item.isFile()) {
        await copyFile(
          join(__dirname, sourceDir, item.name),
          join(__dirname, targetDir, item.name)
        );
      }
    });
  } catch (error) {
    console.error("FS operation failed");
  }
};

copy();
