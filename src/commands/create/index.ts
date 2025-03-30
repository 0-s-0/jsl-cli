import { Command } from "commander";
import action from "./action";

export default (program: Command) => {
  program
    .command("create [name]")
    .description("创建一个新的项目")
    .action(action);
};
