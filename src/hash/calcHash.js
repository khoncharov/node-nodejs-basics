import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fsPromise from "fs/promises";
import { stdout } from "process";
import { createHash } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const calculateHash = async () => {
  const folder = "files";
  const fileToRead = "fileToCalculateHashFor.txt";
  try {
    const content = await fsPromise.readFile(join(__dirname, folder, fileToRead), {
      encoding: "utf-8",
    });
    const hash = createHash("sha256").update(content).digest("hex");
    stdout.write(hash + "\n");
  } catch (error) {
    console.error(error);
  }
};

calculateHash();
