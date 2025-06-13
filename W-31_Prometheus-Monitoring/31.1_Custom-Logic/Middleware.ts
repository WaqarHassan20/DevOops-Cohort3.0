import type { Request, Response, NextFunction } from "express";

export function Middleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  next();
  const endTime = Date.now();

  console.log({
    "Time Taken": endTime - startTime + "ms",
    Method: req.method,
    Route: req.path,
  });

}
