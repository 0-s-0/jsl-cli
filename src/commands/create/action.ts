import inquirer from "inquirer";
import { Framework } from "../../types/Framework";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { errorLog, warnLog } from "../../utils/log";
import mkdir from "../../utils/mkdir";
import cloneRepo from "../../utils/cloneRepo";
import config from "../../config";
import installVueRouter from "./installVueRouter";

export default async (name: string = "project") => {

  // 输入项目名字
  const { projectName } = await inquirer.prompt<{
    projectName: string;
  }>([
    {
      type: "input",
      name: "projectName",
      message: "请输入你的项目名称",
      default: name, // 设置默认值
    },
  ]);

  const dirPath = path.join(process.cwd(), `./${projectName}`);
  // 验证文件夹
  if (fs.existsSync(dirPath)) {
    errorLog("当前目录下文件夹已存在！");
    return;
  }

  // 选择框架
  const { framework } = await inquirer.prompt<{
    framework: Framework;
  }>([
    {
      type: "list",
      name: "framework",
      message: "请选择使用的框架?",
      choices: ["Vue", "React", "Nuxt", "Next"],
    },
  ]);

  if (framework === "Vue") {
    const {
      isTailwindcss,
      isEslint,
      isVueRouter,
      isPinia,
      isSvg,
      isTypescript,
      isI18n,
      ui,
      isAxios
    } = await inquirer.prompt<{
      isTailwindcss: boolean;
      isEslint: boolean;
      isVueRouter: boolean;
      isPinia: boolean;
      isSvg: boolean;
      isTypescript: boolean;
      isI18n: boolean;
      ui: string;
      isAxios:boolean;
    }>([
      {
        type: "confirm",
        name: "isTypescript",
        message: `是否使用${chalk.yellow("typescript")}?`,
      },
      {
        type: "confirm",
        name: "isVueRouter",
        message: `是否使用${chalk.yellow("vue-router")}路由?`,
      },
      {
        type: "confirm",
        name: "isPinia",
        message: `是否使用${chalk.yellow("pinia")}状态管理?`,
      },
      {
        type: "confirm",
        name: "isTailwindcss",
        message: `是否使用${chalk.yellow("taiwindcss")}?`,
      },
      {
        type: "confirm",
        name: "isEslint",
        message: `是否使用${chalk.yellow("eslint")}?`,
      },
      {
        type: "list",
        name: "ui",
        message: "请选择使用的常用ui框架",
        choices: ["Element", "Vant", "None"],
      },
      {
        type: "confirm",
        name: "isSvg",
        message: `是否生成svg组件库，方便快捷操作icon?`,
      },
      {
        type: "confirm",
        name: "isAxios",
        message: `是否使用${chalk.yellow('axios')}请求?`,
      },
      {
        type: "confirm",
        name: "isI18n",
        message: `是否使用国际化${chalk.yellow("vue-i18n")}?`,
      },
    ]);

    // 创建文件
    if (mkdir(dirPath)) return;

    // 下载zip
    if (await cloneRepo(config.gitAdd, dirPath, ['--branch', isTypescript ? config.vueBranch : config.vueTsBranch])) return;

    // 初始化路由配置 isVueRouter
    if(isVueRouter) installVueRouter(dirPath)

    // 安装国际化

    // 安装axios

    // 安装eslint

  } else {
    warnLog(`${framework} 暂未开放，敬请期待`);
  }
};
