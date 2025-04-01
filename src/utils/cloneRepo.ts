import simpleGit, { TaskOptions } from "simple-git";
import { errorLog, successLog } from "./log";
import loading from "loading-cli";
const git = simpleGit();
export default async (repoUrl: string, destDir: string, opt?: TaskOptions) => {
  const load = loading("正在创建...").start();
  try {
    await git.clone(repoUrl, destDir, opt);
    load.stop();
    successLog("创建成功");
  } catch (error) {
    load.stop();
    errorLog("克隆仓库失败");
    return error;
  }
};
