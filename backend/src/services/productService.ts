import axios from "axios"

import { Product, mapToProduct } from "@/models/product"

import { getCategories } from "@/services/categoryService"

import { MercadoLibre } from "@/config/endpoints"

const baseUrl = process.env.MERCADO_LIBRE_API_URL

export const getProductData = async (id: string): Promise<Product> => {
  try {
    const [responseItem, responseDescription] = await Promise.all([
      axios.get(`${baseUrl}${MercadoLibre.PRODUCTS}/${id}`),
      axios.get(
        `${baseUrl}${MercadoLibre.PRODUCTS}${id}/${MercadoLibre.DESCRIPTION}`
      ),
    ])

    const data = responseItem.data
    const descriptionData = responseDescription.data
    const product = mapToProduct(data)
    product.description = descriptionData.plain_text
    product.categories = await getCategories(data.category_id)

    return product
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "API error")
    } else {
      throw new Error("Unexpected error")
    }
  }
}
