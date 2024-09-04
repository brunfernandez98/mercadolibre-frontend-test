import cors from "cors"
import express from "express"

import "@/config/env"

import router from "@/routes/productRoute"

import { config } from "./config/config"
import { errorHandler } from "./middlewares/errors"
import { authMiddleware } from "./middlewares/interceptor"

const app = express()
const baseURL = process.env.BASE_URL ?? "/api"

const corsDomain = [config.frontendUrl, "http://localhost:5173"]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || corsDomain.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("CORS not allowed for this domain"))
    }
  },
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(authMiddleware)
app.use(baseURL, router)
app.use(errorHandler)

export default app
