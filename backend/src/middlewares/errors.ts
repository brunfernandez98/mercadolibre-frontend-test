import { logger } from "@/logger/logger"
import { NextFunction, Request, Response } from "express"

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.response) {
    const { status, data } = err.response

    logger.error(`API Error: ${status} - ${data?.message || "Unknown Error"}`)

    return res.status(status).json({
      error: data?.message || "Error en la respuesta de la API",
    })
  }

  const status = err.status || 500
  const message = err.message || "Internal Server Error"

  logger.error(`Error: ${status} - ${message}`)

  return res.status(status).json({ error: message })
}
