import ParsedCommand from "../types/ParsedCommand"
import { executeDockerCommand } from "./docker/executor"

export const execute = (command: ParsedCommand) => {
    const category = command.category;

    switch (category) {
        case 'docker':
            executeDockerCommand(command);
            break;


        default:
            break;
    }


}