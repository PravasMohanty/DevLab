const {
    executeSimulation
} = require("../services/simulation.services");

exports.simulate = async (req, res) => {

    try {

        const response = await executeSimulation(req.body);

        res.status(response.status).json(response.data);

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: "Gateway Error"

        });

    }

};