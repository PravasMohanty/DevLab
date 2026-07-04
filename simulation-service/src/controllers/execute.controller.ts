import { Request, Response, NextFunction } from 'express';
import { SessionManager } from '../sessions/sessionManager.js';
import { SimulationEngine } from '../engine/simulator.js';

export const executeCommand = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { command, sessionId } = req.body;

    if (typeof command !== 'string') {
      res.status(400).json({ error: 'Command must be a string' });
      return;
    }

    const activeSessionId = sessionId || 'default-session';

    const sessionState = SessionManager.getInstance().getSession(activeSessionId);
    const engine = new SimulationEngine(sessionState);

    const result = engine.execute(command);

    res.status(200).json({
      output: result.output,
      error: result.error || false,
      sessionId: activeSessionId,
    });
  } catch (err) {
    next(err);
  }
};
