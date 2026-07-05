import ParsedCommand from "../types/ParsedCommand"
import { executeDockerCommand } from "./docker/dockerExecutor"

export const execute = (command: ParsedCommand) => {
    const category = command.category;

    switch (category) {
        case 'docker':
            return executeDockerCommand(command);
            break;


        default:
            return {
                success: false,
                message: "Unsupported command"
            };
    }


}