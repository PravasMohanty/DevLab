import { generateContainerName } from "../../utils/helpers";
import { dockerState } from "../state";
import type { Image, Container } from "../state";

import type { ServiceResponse } from "../../types/ServiceResponse";

export const PullDockerImage = (imageName: string): ServiceResponse<Image> => {

    if (dockerState.images.find(image => image.name === imageName)) {
        return {
            success: false,
            message: "Requirement already satisfied"
        };
    }

    const image: Image = {
        id: Math.random().toString(36).substring(7),
        name: imageName,
        tag: "latest"
    };

    dockerState.images.push(image);

    return {
        success: true,
        message: `Image '${imageName}' pulled successfully`,
        data: image
    };
};

export const ShowDockerImages = (): ServiceResponse<Image[]> => {

    return {
        success: true,
        message: "Images fetched successfully",
        data: dockerState.images
    };
};

export const RunDockerImage = (
    imageName: string,
    flags: string[]
): ServiceResponse<Container> => {

    const image = dockerState.images.find(
        image => image.name === imageName
    );

    if (!image) {
        return {
            success: false,
            message: `Image '${imageName}' not found`
        };
    }

    const container: Container = {
        id: Math.random().toString(36).substring(7),
        name: generateContainerName(),
        image: imageName,
        status: "running"
    };

    dockerState.containers.push(container);

    return {
        success: true,
        message: `Container '${container.name}' created successfully`,
        data: container
    };
}

export const StopDockerContainer = (
    containerName: string
): ServiceResponse => {

    const container = dockerState.containers.find(
        c => c.name === containerName || c.id === containerName
    );

    if (!container) {
        return {
            success: false,
            message: "Container not found"
        };
    }

    container.status = "stopped";

    return {
        success: true,
        message: `Container '${container.name}' stopped successfully`
    };
}

export const ShowDockerContainers = (
    flags: string[]
): ServiceResponse<Container[]> => {

    let containers: Container[];

    if (flags.includes("-a")) {
        containers = dockerState.containers;
    } else if (flags.includes("-s")) {
        containers = dockerState.containers.filter(
            c => c.status === "stopped"
        );
    } else {
        containers = dockerState.containers.filter(
            c => c.status === "running"
        );
    }

    return {
        success: true,
        message: "Containers fetched successfully",
        data: containers
    };
}

export const ShowDockerContainerInfo = (
    containerName: string
): ServiceResponse<Container> => {

    const container = dockerState.containers.find(
        c => c.name === containerName || c.id === containerName
    );

    if (!container) {
        return {
            success: false,
            message: "Container not found"
        };
    }

    return {
        success: true,
        message: "Container information fetched successfully",
        data: container
    };
}

export const RemoveDockerContainer = (
    containerName: string
): ServiceResponse => {

    const container = dockerState.containers.find(
        c => c.name === containerName || c.id === containerName
    );

    if (!container) {
        return {
            success: false,
            message: "Container not found"
        };
    }

    dockerState.containers = dockerState.containers.filter(
        c => c.name !== containerName && c.id !== containerName
    );

    return {
        success: true,
        message: `Container '${container.name}' removed successfully`
    };
}