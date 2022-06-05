import { stdin, stdout } from "process";
import { pipeline, Transform } from "stream";

const reverseInput = new Transform({
  transform(chunk, encoding, cb) {
    cb(null, String(chunk).trim().split("").reverse().join(""));
  },
});

export const transform = async () => {
  pipeline(stdin, reverseInput, stdout, (error) => console.log(error));
  stdin.on("data", () => process.exit());
};

transform();
