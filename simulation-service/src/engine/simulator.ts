import ParsedCommand from "../types/ParsedCommand"
import { executeDockerCommand } from "./docker/executor"

const execute = (command: ParsedCommand) => {
    const category = command.category;

    switch (category) {
        case 'docker':
            executeDockerCommand(command);
            break;


        default:
            break;
    }


}