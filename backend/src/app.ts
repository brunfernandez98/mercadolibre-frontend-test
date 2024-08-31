import router from "@/routes/productRoute"
import express from "express"

const app = express()
const baseURL = process.env.BASE_URL ?? "/api"

app.use(express.json())

app.use(baseURL, router)
/* app.use(errorHanlder) */

export default app
