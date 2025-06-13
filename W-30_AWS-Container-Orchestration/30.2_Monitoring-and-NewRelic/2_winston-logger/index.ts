import winston from "winston"
const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  //   format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(),
  ],
});

logger.error("This is an error message")
logger.info("This is an info message")
logger.debug("This is a debug message")
logger.warn("This is a warning message");