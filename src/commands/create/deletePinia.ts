import path from "path";
import fs from "fs";
import deleteDependency from "../../utils/deleteDependency";
import deleteLine from "../../utils/deleteLine";
const rimraf = require("rimraf");

export default (rootPath: string) => {
  // 添加依赖
  deleteDependency({
    packageJsonPath: path.resolve(rootPath, "./package.json"),
    type: "dependencies",
    name: "pinia",
  });

  // 删除文件夹
  rimraf.sync(path.resolve(rootPath, "./src/stores"));

  // 修改main.js
  const mainPath = path.resolve(rootPath, "./src/main.js");
  let main = fs.readFileSync(mainPath, "utf-8");
  main = deleteLine(main, "import { createPinia } from 'pinia'")
  main = deleteLine(main, "const pinia = createPinia()")
  .replace(
    ".use(pinia)",
    ""
  );
  fs.writeFileSync(mainPath, main);
};
