import { dockerState } from "../state";
import type { Image, Container } from "../state";

export const PullDockerImage = (imageName: string) => {
    console.log(`Pulling Docker image: ${imageName}`);
    try {
        if (dockerState.images.find(image => image.name === imageName)) {
            console.log("Requirement already satisfied");
            return;
        }
        const image: Image = {
            id: Math.random().toString(36).substring(7),
            name: imageName,
            tag: "latest"
        };
        dockerState.images.push(image);
        console.log(`Image : ${imageName} pulled successfully`);
        return image;
    } catch (error) {
        console.error("Error pulling Docker image:", error);
    }
}

export const ShowDockerImages = () => {
    console.log("Listing Docker images");
    return dockerState.images;
}

export const RunDockerImage = (imageName: string, flags: string) => {
    try {
        if (!dockerState.images.find(image => image.name === imageName)) {
            console.log(`Image : ${imageName} not found`);
            return;
        }
        const container: Container = {
            id: Math.random().toString(36).substring(7),
            name: imageName,
            image: imageName,
            status: "running"
        };
        dockerState.containers.push(container);
        console.log(`Container : ${imageName} created successfully`);
        return container;
    } catch (error) {
        console.error("Error creating Docker container:", error);
    }
}

export const StopDockerContainer = (containerName: string) => {
    console.log(`Stopping Docker image: ${containerName}`);
    try {
        const container = dockerState.containers.find(
            container =>
                container.name === containerName ||
                container.id === containerName
        );

        if (!container) {
            console.log(`Container not found`);
            return;
        }


        container.status = 'stopped'
        console.log(`Container : ${containerName} stopped successfully`);
        return;

    } catch (error) {
        console.error("Error stopping Docker image:", error);
    }
}

export const ShowDockerContainers = (flags: string) => {
    console.log(`Listing Docker containers with flags: ${flags}`);
    if (flags === "-a") {
        return dockerState.containers;
    }
    else if (flags === "-s") {
        return dockerState.containers.filter(c => c.status === "stopped");
    }
    return dockerState.containers.filter(c => c.status === "running");

}

export const ShowDockerContainerInfo = (containerName: string) => {
    try {
        const container = dockerState.containers.find(
            container =>
                container.name === containerName ||
                container.id === containerName
        );

        if (!container) {
            console.log(`Container not found`);
            return;
        }

        console.log(`Container : ${containerName} info`);
        console.log(container);
        return container;
    } catch (error) {
        console.error("Error showing Docker container info:", error);
    }
}

export const RemoveDockerContainer = (containerName: string) => {
    console.log(`Removing Docker container: ${containerName}`);
    try {
        const container = dockerState.containers.find(
            container =>
                container.name === containerName ||
                container.id === containerName
        );

        if (!container) {
            console.log(`Container not found`);
            return;
        }

        dockerState.containers = dockerState.containers.filter(
            container =>
                container.name !== containerName &&
                container.id !== containerName
        );

        console.log(`Container ${containerName} removed successfully`);
        return;
    } catch (error) {
        console.error("Error removing Docker container:", error);
    }
}

