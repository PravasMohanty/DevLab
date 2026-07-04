
import ParsedCommand from "../../types/ParsedCommand";
import {
    PullDockerImage,
    ShowDockerImages,
    RunDockerImage,
    StopDockerImage,
    ShowDockerContainers,
    ShowDockerContainerInfo,
    RemoveDockerContainer
} from "./commands";


export const executeDockerCommand = (command: ParsedCommand) => {
    const action = command.action;

    switch (action) {
        case "pull":
            PullDockerImage(command.name)
            break;

        case "images":
            ShowDockerImages()
            break;

        case "run":
            RunDockerImage(command.name, command.flag)
            break;

        case "stop":
            StopDockerImage(command.name)
            break;

        case "ps":
            ShowDockerContainers(command.flag)
            break;

        case "inspect":
            ShowDockerContainerInfo(command.name)
            break;

        case "rm":
            RemoveDockerContainer(command.name)
            break;

        default:
            console.log("Invalid command");
            break;
    }


}