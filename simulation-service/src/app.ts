import express from "express";
import executeRoutes from "./routes/execute.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "simulation-service" });
});

app.use("/api", executeRoutes);

export default app;