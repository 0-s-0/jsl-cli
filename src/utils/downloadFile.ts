import fs from "fs";
import https from "https";
export default (url: string, dest: string) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close(resolve); // 完成下载后关闭文件流
          });
        } else {
          reject(
            new Error(`下载远程文件失败. 失败代码: ${response.statusCode}`)
          );
        }
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {}); // 删除部分下载的文件
        reject(err);
      });
  });
};
