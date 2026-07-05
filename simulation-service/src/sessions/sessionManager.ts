import { DockerState } from "../engine/state";

const sessions = new Map<string, DockerState>();

const createInitialState = (): DockerState => ({
    images: [],
    containers: [],
});

export const getState = (sessionId: string): DockerState => {
    try {
        let state = sessions.get(sessionId);

        if (!state) {
            state = createInitialState();
            sessions.set(sessionId, state);
        }

        return state;
    } catch (error) {
        console.error("Error getting session state:", error);

        // Fallback (should rarely happen)
        return createInitialState();
    }
};

export const clearState = (sessionId: string): boolean => {
    try {
        return sessions.delete(sessionId);
    } catch (error) {
        console.error("Error clearing session state:", error);
        return false;
    }
};

export const hasSession = (sessionId: string): boolean => {
    return sessions.has(sessionId);
};

export const getAllSessions = (): string[] => {
    return [...sessions.keys()];
};