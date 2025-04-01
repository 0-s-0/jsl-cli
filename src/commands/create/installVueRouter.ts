import mkdir from "../../utils/mkdir";
import path from "path";
import fs from "fs";
import os from "os";
import addDependency from "../../utils/addDependency";
import vueRouterIndexCode from "../../templateCode/vueRouterIndexCode";
import HomeVueCode from "../../templateCode/HomeVueCode";
import mainAppUse from "../../utils/mainAppUse";

export default (rootPath: string) => {
  // 添加依赖
  addDependency({
    packageJsonPath: path.resolve(rootPath, "./package.json"),
    type: "dependencies",
    name: "vue-router",
    version: "^4.5.0",
  });

  // 创建文件夹
  mkdir(path.resolve(rootPath, "./src/router"));

  // 创建index.js，写入文件
  fs.writeFileSync(
    path.resolve(rootPath, "./src/router/index.js"),
    vueRouterIndexCode
  );

  // 创建pages文件夹
  mkdir(path.resolve(rootPath, "./src/pages"));

  // 写入Home文件
  fs.writeFileSync(path.resolve(rootPath, "./src/pages/Home.vue"), HomeVueCode);

  // 修改main.js 添加vue-router入口
  mainAppUse({
    mainPath:path.resolve(rootPath, "./src/main.js"),
    name:"router",
    importCode:"import router from './router'"
  })
  
  // 修改app文件，添加router-view
  let app = fs.readFileSync(path.resolve(rootPath, "./src/App.vue"), "utf-8");
  app = app.replace("</template>", `  <router-view />${os.EOL}</template>`);
  fs.writeFileSync(path.resolve(rootPath, "./src/App.vue"), app);
};
