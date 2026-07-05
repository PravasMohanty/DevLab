import express from "express";
import executeRoutes from "./routes/execute.routes";

const app = express();

app.use(express.json());

app.use("/api", executeRoutes);

export default app;