import path from "path";
import fs from "fs";
import deleteDependency from "../../utils/deleteDependency";
import deleteLine from "../../utils/deleteLine";
const rimraf = require("rimraf");

export default (rootPath: string) => {
  // 删除依赖
  deleteDependency({
    packageJsonPath: path.resolve(rootPath, "./package.json"),
    type: "devDependencies",
    name: "tailwindcss",
  });
  deleteDependency({
    packageJsonPath: path.resolve(rootPath, "./package.json"),
    type: "devDependencies",
    name: "postcss",
  });
  deleteDependency({
    packageJsonPath: path.resolve(rootPath, "./package.json"),
    type: "devDependencies",
    name: "autoprefixer",
  });
  rimraf.sync(path.resolve(rootPath, "./postcss.config.js"));
  rimraf.sync(path.resolve(rootPath, "./src/assets/css/tailwind.css"));
  rimraf.sync(path.resolve(rootPath, "./tailwind.config.js"));

  // 修改main.js 删除vue-router入口
  const mainPath = path.resolve(rootPath, "./src/main.js");
  let main = fs.readFileSync(mainPath, "utf-8");
  main = deleteLine(main, "import '@/assets/css/tailwind.css'")
  fs.writeFileSync(mainPath, main);
};
