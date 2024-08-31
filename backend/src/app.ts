import express from "express"

import "@/config/env"

import router from "@/routes/productRoute"

import { errorHandler } from "./middlewares/errors"

const app = express()
const baseURL = process.env.BASE_URL ?? "/api"

app.use(express.json())
app.use(baseURL, router)
app.use(errorHandler)

export default app
