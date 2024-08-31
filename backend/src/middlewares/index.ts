import { Request, Response } from "express"

const errorHandler = (err: any, _: Request, res: Response) => {
  const status = err.response?.status || 500
  const message = err.customMessage || "Internal Server error"
  res.status(status).json({ message })
}

export default errorHandler
