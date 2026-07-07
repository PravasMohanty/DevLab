const axios = require("axios");

const SIMULATION_SERVICE_URL =
    process.env.SIMULATION_SERVICE_URL || "http://localhost:3000";

/**
 * Forwards a simulation request to the Simulation Service.
 * @param {Object} body - The request body containing the command to execute.
 * @returns {Promise<import("axios").AxiosResponse>} The response from the simulation service.
 */
const executeSimulation = async (body) => {
    const response = await axios.post(
        `${SIMULATION_SERVICE_URL}/api/execute`,
        body
    );
    return response;
};

module.exports = { executeSimulation };
