#! /usr/bin/env node
// 标识文件使用node可执行
import Pack from "../package.json"; // 导入 package.json
import { Command } from "commander"; // 从 commander 库导入 Command 类
import inquirer from "inquirer";
import create from "./commands/create";

// 创建一个新的 Command 实例
const program = new Command();

// 设置程序的名称，使用 package.json 中的名称字段
program
  .name(Pack.name) // 设置命令行工具的名称，通常从 package.json 文件中读取
  .version(Pack.version) // 设置命令行工具的版本，通常从 package.json 中读取
  .helpOption("-h,--help") // 添加一个帮助选项，用户可以通过 -h 或 --help 来查看帮助文档
  .usage(`<command> [option]`); // 设置命令行工具的用法提示

create(program)
program.parse(); // 解析命令行输入的参数
