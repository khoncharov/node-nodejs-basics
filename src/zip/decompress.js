import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import { createUnzip } from "zlib";
import { pipeline } from "stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const decompress = async () => {
  const folder = "files";
  const sourceFile = "archive.gz";
  const destFile = "fileToCompress.txt";
  try {
    await pipeline(
      fs.createReadStream(join(__dirname, folder, sourceFile)),
      createUnzip(),
      fs.createWriteStream(join(__dirname, folder, destFile))
    );
  } catch (error) {
    console.error(error);
  }
};

decompress();
