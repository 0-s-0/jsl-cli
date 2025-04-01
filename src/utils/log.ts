import chalk from "chalk";
export const errorLog = (msg:string) => console.log(chalk.red(`❌ ${msg}`));
export const successLog = (msg:string) => console.log(chalk.green(`✔ ${msg}`));
export const warnLog = (msg:string) => console.log(chalk.yellow(`⚠️  ${msg}`));
