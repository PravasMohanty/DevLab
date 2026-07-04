
export const PullDockerImage = (imageName: string) => {
    console.log(`Pulling Docker image: ${imageName}`);
}

export const ShowDockerImages = () => {
    console.log("Listing Docker images");
}

export const RunDockerImage = (imageName: string, flags: string) => {
    console.log(`Running Docker image: ${imageName} with flags: ${flags}`);
}

export const StopDockerImage = (imageName: string) => {
    console.log(`Stopping Docker image: ${imageName}`);
}

export const ShowDockerContainers = (flags: string) => {
    console.log(`Listing Docker containers with flags: ${flags}`);
}

export const ShowDockerContainerInfo = (containerName: string) => {
    console.log(`Showing Docker container info: ${containerName}`);
}

export const RemoveDockerContainer = (containerName: string) => {
    console.log(`Removing Docker container: ${containerName}`);
}

