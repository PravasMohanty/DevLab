import ParsedCommand from "../../types/ParsedCommand";
import {
    PullDockerImage,
    ShowDockerImages,
    RunDockerImage,
    StopDockerContainer,
    ShowDockerContainers,
    ShowDockerContainerInfo,
    RemoveDockerContainer,
} from "./dockerActions";

export const executeDockerCommand = (command: ParsedCommand) => {
    switch (command.action) {

        case "pull":
            const imageName = command.args[0];

            if (!imageName) {
                console.log("Image name is required.");
                return;
            }

            PullDockerImage(imageName);
            break;

        case "images":
            ShowDockerImages();
            break;

        case "run":
            const runImageName = command.args[0];

            if (!runImageName) {
                console.log("Image name is required.");
                return;
            }

            RunDockerImage(runImageName, command.flags);
            break;

        case "stop":
            const stopImageName = command.args[0];

            if (!stopImageName) {
                console.log("Image name is required.");
                return;
            }
            StopDockerContainer(stopImageName);
            break;

        case "ps":
            ShowDockerContainers(command.flags);
            break;

        case "inspect":
            const inspectImageName = command.args[0];

            if (!inspectImageName) {
                console.log("Image name is required.");
                return;
            }
            ShowDockerContainerInfo(inspectImageName);
            break;

        case "rm":
            const rmImageName = command.args[0];

            if (!rmImageName) {
                console.log("Image name is required.");
                return;
            }
            RemoveDockerContainer(rmImageName);
            break;

        default:
            console.log("Invalid command");
    }
};