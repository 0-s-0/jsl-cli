import fs from "fs";
import os from "os";
export default ({
  mainPath,
  importCode,
  name,
}: {
  mainPath: string;
  name: string;
  importCode?: string;
}) => {
  let main = fs.readFileSync(mainPath, "utf-8");
  main = `importCode${os.EOL}` + main;
  main = main.replace("createApp(App)", `createApp(App).use(${name})`);
  fs.writeFileSync(mainPath, main);
};
