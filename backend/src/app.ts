import express from "express"

import productRoutes from "@routes/productRoute"

const app = express()

app.use(express.json())

app.use("./api", productRoutes)
/* app.use(errorHanlder) */

export default app
