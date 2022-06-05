import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { env } from "process";
import { Worker } from "worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initValue = 10;

export const performCalculations = async () => {
  const cpuNum = env.NUMBER_OF_PROCESSORS;
  const workers = [];
  const workerFilePath = join(__dirname, "./worker.js");
  for (let i = 0; i < cpuNum; i += 1) {
    const options = { workerData: initValue + i };
    workers.push(
      new Promise((resolve, reject) => {
        const worker = new Worker(workerFilePath, options);
        worker.on("message", (msg) => {
          resolve({
            status: "resolved",
            data: msg,
          });
        });
        worker.on("error", () => {
          reject({
            status: "error",
            data: null,
          });
        });
      })
    );
  }
  const results = await Promise.allSettled(workers);
  console.log(
    results.map((item) => {
      if (item.status === "fulfilled") {
        return item.value;
      }
      if (item.status === "rejected") {
        return item.reason;
      }
    })
  );
};

performCalculations();
