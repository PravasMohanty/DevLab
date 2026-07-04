import { parse } from "./engine/parser";
import { execute } from "./engine/simulator";
import { dockerState } from "./engine/state";

const commands = [
    "docker pull nginx",
    "docker pull redis",
    "docker images",
    "docker run nginx",
    "docker run redis",
    "docker ps",
    "docker stop nginx",
    "docker ps",
    "docker ps -a",
    "docker inspect nginx",
    "docker rm nginx",
];

for (const command of commands) {
    console.log("\n======================================");
    console.log(`> ${command}`);

    const parsedCommand = parse(command);

    if (!parsedCommand) {
        console.log("Invalid Command");
        continue;
    }

    const result = execute(parsedCommand);

    console.log("\nResult:");
    console.log(result);

    console.log("\nCurrent Docker State:");
    console.dir(dockerState, { depth: null });
}