import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { writeFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const create = async () => {
  const targetDir = "files";
  const fileName = "fresh.txt";
  const content = "I am fresh and young";
  const options = {
    flag: "wx",
  };
  try {
    await writeFile(join(__dirname, targetDir, fileName), content, options);
  } catch (err) {
    console.error("FS operation failed");
  }
};

create();
