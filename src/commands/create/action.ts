import inquirer from "inquirer";
import { Framework } from "../../types/Framework";
import chalk from "chalk";

export default async (projectName: string = "project") => {
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
    const data = await inquirer.prompt<{
      isTailwindcss: boolean;
      isEslint: boolean;
      isVueRouter: boolean;
      isPinia: boolean;
      isSvg: boolean;
      ui: string;
    }>([
      {
        type: "confirm",
        name: "isVueRouter",
        message: "是否使用vue-router路由",
      },
      {
        type: "confirm",
        name: "isPinia",
        message: "是否使用pinia状态管理",
      },
      {
        type: "confirm",
        name: "isTailwindcss",
        message: "是否使用taiwindcss?",
      },
      {
        type: "confirm",
        name: "isEslint",
        message: "是否使用eslint?",
      },
      {
        type: "confirm",
        name: "isSvg",
        message: "是否生成svg组件库，方便快捷操作icon?",
      },
      {
        type: "list",
        name: "ui",
        message: "请选择使用的常用ui框架",
        choices: ["Element", "Vant", "None"],
      },
    ]);
    console.log(data);
  } else {
    console.error(chalk.red("未开放，敬请期待"));
  }
};
