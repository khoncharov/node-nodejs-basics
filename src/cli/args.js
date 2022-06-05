import { argv, stdout } from "process";

export const parseArgs = () => {
  const agrsArr = argv.slice(2);
  let resStr = "";
  for (let i = 0; i < agrsArr.length; i += 2) {
    resStr += `${agrsArr[i].slice(2)} is ${agrsArr[i + 1]}, `;
  }
  stdout.write(resStr.slice(0, -2) + "\n");
};

parseArgs();
