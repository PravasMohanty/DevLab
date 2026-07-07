const {
    executeSimulation
} = require("../services/simulation.services");

exports.simulate = async (req, res) => {

    try {

        const response = await executeSimulation(req.body);

        res.status(response.status).json(response.data);

    }

    catch (err) {

        if (err.response) {
            return res.status(err.response.status).json(err.response.data);
        }

        res.status(500).json({

            success: false,

            message: "Gateway Error"

        });

    }

};