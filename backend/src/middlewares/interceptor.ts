import { NextFunction, Request, Response } from "express"

import { config } from "@/config/config"

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"]

  if (!apiKey) {
    return res.status(401).json({ message: "API Key is missing" })
  }

  if (apiKey !== config.api_key) {
    return res.status(403).json({ message: "Invalid API Key" })
  }

  next()
}
