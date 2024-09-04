import { MercadoLibre } from "@/config/config"

import axiosInstance from "@/core/axiosInstance"

export const getCategories = async (categoryId: string): Promise<[]> => {
  try {
    const responseCategories = await axiosInstance.get(
      `${MercadoLibre.CATEGORIES}/${categoryId}`
    )
    const categoriesData = responseCategories.data
    return categoriesData.path_from_root
  } catch (error) {
    throw new Error("Error retrieving categories")
  }
}
