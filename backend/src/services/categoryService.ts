import { logger } from "@/logger/logger"

import { MercadoLibre } from "@/config/config"

import axiosInstance from "@/core/axiosInstance"

export const getCategories = async (categoryId: string) => {
  try {
    logger.info(`Fetching categories categoryId: ${categoryId}`)
    const responseCategories = await axiosInstance.get(
      `${MercadoLibre.CATEGORIES}/${categoryId}`
    )
    const categoriesData = responseCategories.data
    logger.info(`Categories fetched successfully categoryId: ${categoryId}`)

    return categoriesData.path_from_root
  } catch (error) {
    logger.error(`Error retrieving categories for categoryId: ${categoryId}`, {
      error: error,
    })
    throw new Error("Error retrieving categories")
  }
}
