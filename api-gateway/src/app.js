const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const simulationRoutes = require("./routes/simulation.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", service: "api-gateway" });
});

app.use("/simulate", simulationRoutes);

module.exports = app;