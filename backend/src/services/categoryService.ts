import axios from "axios"

import { mapToCategory } from "@/models/category"

import { MercadoLibre } from "@/config/endpoints"

const baseUrl = process.env.MERCADO_LIBRE_API_URL

export const getCategories = async (categoryId: string): Promise<string> => {
  try {
    const responseCategories = await axios.get(
      `${baseUrl}${MercadoLibre.CATEGORIES}/${categoryId}`
    )
    const categoriesData = responseCategories.data

    return mapToCategory(categoriesData.path_from_root, "#")
  } catch (error) {
    throw new Error("Error retrieving categories")
  }
}
