import axios from "axios"

import { Product, mapToProduct } from "@/models/product"

import { getCategories } from "@/services/categoryService"

import { MercadoLibre, config } from "@/config/endpoints"

export const getProductData = async (id: string): Promise<Product> => {
  const [responseItem, responseDescription] = await Promise.all([
    axios.get(`${config.baseUrl}${MercadoLibre.PRODUCTS}/${id}`),
    axios.get(
      `${config.baseUrl}${MercadoLibre.PRODUCTS}/${id}/${MercadoLibre.DESCRIPTION}`
    ),
  ])

  const data = responseItem.data
  const descriptionData = responseDescription.data
  const product = mapToProduct(data)
  product.description = descriptionData.plain_text
  product.categories = await getCategories(data.category_id)

  return product
}
