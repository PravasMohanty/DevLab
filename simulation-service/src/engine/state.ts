export interface Image {
    id: string;
    name: string;
    tag: string;
}

export interface Container {
    id: string;
    name: string;
    image: string;
    status: "running" | "stopped" | "paused";
}

export interface DockerState {
    images: Image[];
    containers: Container[];
}

export const dockerState: DockerState = {
    images: [],
    containers: []
};