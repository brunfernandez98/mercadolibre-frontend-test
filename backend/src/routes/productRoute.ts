import { getProductById } from "@/controllers/productController"
import { Router } from "express"

const router = Router()

router.get("/products/:id", getProductById)

export default router
