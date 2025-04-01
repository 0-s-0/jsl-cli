import fs from "fs";
import { errorLog, successLog } from "./log";
export default (dirPath: string) => {
  try {
    fs.mkdirSync(dirPath);
  } catch (error) {
    errorLog("文件创建失败")
    return error
  }
};
