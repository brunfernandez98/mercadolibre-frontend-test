import cors from "cors"
import express from "express"

import { config } from "./config/config"
import { logger } from "./logger/logger"
import { errorHandler } from "./middlewares/errors"
import { authMiddleware } from "./middlewares/interceptor"
import router from "./routes/productRoute"

const app = express()
const baseURL = process.env.BASE_URL ?? "/api"

const corsDomain = [
  config?.frontendUrl,
  "http://localhost:5173",
  "http://localhost:4173",
]

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      corsDomain.includes(origin) ||
      process.env.NODE_ENV === "development"
    ) {
      callback(null, true)
    } else {
      callback(new Error(`CORS not allowed for this domain: ${origin}`))
    }
  },
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(authMiddleware)
app.use(baseURL, router)
app.use((req, _res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url} from ${req.ip}`)
  next()
})
app.use(errorHandler)

export default app
