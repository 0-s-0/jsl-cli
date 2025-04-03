import path from "path";
import fs from "fs";
import deleteDependency from "../../utils/deleteDependency";
import deleteLine from "../../utils/deleteLine";
const rimraf = require("rimraf");

export default (rootPath: string) => {
  // 删除依赖
  deleteDependency({
    packageJsonPath: path.resolve(rootPath, "./package.json"),
    type: "dependencies",
    name: "vue-router",
  });

  // 删除路由文件
  rimraf.sync(path.resolve(rootPath, "./src/router"));
  // 删除pages文件
  rimraf.sync(path.resolve(rootPath, "./src/pages"));

  // 修改main.js 删除vue-router入口
  const mainPath = path.resolve(rootPath, "./src/main.js");
  let main = fs.readFileSync(mainPath, "utf-8");
  main = deleteLine(main, "import router from './router'").replace(
    ".use(router)",
    ""
  );
  fs.writeFileSync(mainPath, main);

  // 修改app文件，删除router-view
  const appPath = path.resolve(rootPath, "./src/App.vue");
  const app = fs.readFileSync(appPath, "utf-8");
  fs.writeFileSync(appPath, deleteLine(app, "router-view"));
};
