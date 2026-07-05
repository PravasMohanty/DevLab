import { DockerState } from "../engine/state";

export interface ServiceResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    state?: DockerState;
}

