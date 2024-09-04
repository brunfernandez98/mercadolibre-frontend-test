import winston from "winston"

import { config } from "@/config/config"

const logLevel = config.env === "production" ? "error" : "debug"

export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
})
