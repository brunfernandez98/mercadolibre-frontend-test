import { Router } from "express"

import { getProductById } from "@controllers/productController"

const router = Router()

router.get("/products/:id", getProductById)

export default router
