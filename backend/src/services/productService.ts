import axios from "axios"

import { MercadoLibre } from "@/config/endpoints"

const baseUrl = process.env.MERCADO_LIBRE_API_URL

export const getProductData = async (id: string) => {
  const response = await axios.get(`${baseUrl}${MercadoLibre.PRODUCTS}/${id}`)
  const { name, attributes, pictures } = response.data
  return { name, attributes, pictures }
}
