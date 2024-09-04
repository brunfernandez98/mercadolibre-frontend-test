import dotenv from "dotenv"

dotenv.config()

import app from "./app"

import { logger } from "./logger/logger"

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  logger.info(`Server for MELI-TEST is running at http://localhost:${port}`)
})
