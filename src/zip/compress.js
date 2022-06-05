import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const compress = async () => {
  const folder = "files";
  const sourceFile = "fileToCompress.txt";
  const destFile = "archive.gz";
  try {
    await pipeline(
      fs.createReadStream(join(__dirname, folder, sourceFile)),
      createGzip(),
      fs.createWriteStream(join(__dirname, folder, destFile))
    );
  } catch (error) {
    console.error(error);
  }
};

compress();
