import express from "express"

import productRoutes from "@routes/productRoute"

const app = express()
const baseURL = process.env.BASE_URL ?? "/api"

app.use(express.json())

app.use(baseURL, productRoutes)
/* app.use(errorHanlder) */

export default app
