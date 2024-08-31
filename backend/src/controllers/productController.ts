import { NextFunction, Request, Response } from "express"

import { getProductData } from "@/services/productService"

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const productData = await getProductData(id)
    res.json(productData)
  } catch (error) {
    next(error)
  }
}
