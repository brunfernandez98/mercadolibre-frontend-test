import axios from "axios"
import { NextFunction, Request, Response } from "express"

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params
    const response = await axios.get(
      `https://api.mercadolibre.com/products/${id}`
    )
    const { name, attributes, pictures } = response.data
    const productData = {
      name,
      attributes,
      pictures,
    }
    res.json(productData)
  } catch (error) {
    next(error)
  }
}
