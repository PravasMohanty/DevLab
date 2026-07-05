import { Router } from "express";
import { executeCommand } from "../controllers/execute.controller";

const router = Router();

router.post("/execute", executeCommand);

export default router;