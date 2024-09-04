import { logger } from "@/logger/logger"
import { NextFunction, Request, Response } from "express"

import { config } from "@/config/config"

// @ts-ignore: TS7030
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"]

  if (!apiKey) {
    logger.warn(`Missing API Key from ${req.ip}`)
    return res.status(401).json({ message: "API Key is missing" })
  }

  if (apiKey !== config.api_key) {
    logger.warn(`Invalid API Key from ${req.ip}`)
    return res.status(403).json({ message: "Invalid API Key" })
  }

  logger.info(`Valid API Key from ${req.ip}`)

  next()
}
