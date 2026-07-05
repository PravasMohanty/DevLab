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

            return PullDockerImage(imageName);

        case "images":
            return ShowDockerImages();

        case "run":
            const runImageName = command.args[0];

            if (!runImageName) {
                console.log("Image name is required.");
                return;
            }

            return RunDockerImage(runImageName, command.flags);

        case "stop":
            const stopImageName = command.args[0];

            if (!stopImageName) {
                console.log("Image name is required.");
                return;
            }
            return StopDockerContainer(stopImageName);

        case "ps":
            return ShowDockerContainers(command.flags);

        case "inspect":
            const inspectImageName = command.args[0];

            if (!inspectImageName) {
                console.log("Image name is required.");
                return;
            }
            return ShowDockerContainerInfo(inspectImageName);

        case "rm":
            const rmImageName = command.args[0];

            if (!rmImageName) {
                console.log("Image name is required.");
                return;
            }
            return RemoveDockerContainer(rmImageName);

        default:
            return {
                success: false,
                message: "Invalid command"
            };
    }
};