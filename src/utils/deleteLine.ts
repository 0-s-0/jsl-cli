import os from "os";
export default (code: string, key: string) => {
  const lines = code.split(/\r?\n/);
  return lines.filter((item) => !item.includes(key)).join(os.EOL);
};
