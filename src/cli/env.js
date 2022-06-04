import { env, stdout } from "process";

env.RSS_testProp1 = "value101";
env.RSS_testProp2 = "value102";

export const parseEnv = () => {
  const resList = Object.entries(env).filter((prop) => /^RSS_.*/.test(prop[0]));
  let resStr = "";
  resList.forEach((item) => {
    resStr += `${item[0]}=${item[1]}; `;
  });

  stdout.write(resStr + "\n");
};

parseEnv();
