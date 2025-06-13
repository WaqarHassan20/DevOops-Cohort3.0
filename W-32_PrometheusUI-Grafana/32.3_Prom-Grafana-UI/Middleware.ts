import type { Request, Response, NextFunction } from "express";
import { activeRequestGuage, httpRequestDurationMicroseconds, requestCounter } from "./Count_Guage_Histrogram";


export function Middleware(req: Request, res: Response, next: NextFunction) {

    if (req.path !== "/metrices") {
    activeRequestGuage.inc(); 
  }

  const startTime = Date.now(); 

  
  res.on("finish", () => {
    const endTime = Date.now(); 
    const duration = endTime - startTime;

    console.log(`Request took ${duration}ms`); 

    
    requestCounter.inc({
      method: req.method,                       
      route: req.route?.path || req.path,
      status_code: String(res.statusCode), 
    });

    
    if (req.path !== "/metrices") {
      activeRequestGuage.dec();
    }


    httpRequestDurationMicroseconds.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
        status_code: String(res.statusCode),
      },
      duration
    );
  });

  next();
}
