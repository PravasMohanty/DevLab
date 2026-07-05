import { Request, Response } from "express";
import { parse } from "../engine/parser";
import { execute } from "../engine/simulator";

export const executeCommand = (req: Request, res: Response) => {

  const { command } = req.body;

  if (!command) {
    return res.status(400).json({
      success: false,
      message: "Command is required"
    });
  }

  const parsed = parse(command);

  if (!parsed) {
    return res.status(400).json({
      success: false,
      message: "Invalid command"
    });
  }

  const result = execute(parsed);

  return res.status(200).json({
    success: true,
    result
  });
};