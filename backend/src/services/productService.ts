import { logger } from "@/logger/logger"
import { mapToCategory } from "@/models/category"
import {
  Product,
  ProductAvailabilityStatus,
  SingleProduct,
  mapToSingleProduct,
} from "@/models/product"

import { MercadoLibre } from "@/config/config"

import axiosInstance from "@/core/axiosInstance"

import { getCategories } from "@/services/categoryService"

export const getProductData = async (
  id: string
): Promise<Product | undefined> => {
  logger.info(`Fetching product data for ID: ${id}`)
  const responseProduct = await axiosInstance.get(
    `${MercadoLibre.PRODUCTS}/${id}`
  )
  const data = responseProduct.data
  logger.info(`Product data retrieved for ID: ${id}`)

  let product: SingleProduct = mapToSingleProduct(data)

  if (isProductInactive(data)) {
    logger.warn(`Product with ID ${id} is inactive`)
    return setProductStatus(product, ProductAvailabilityStatus.Unavailable)
  }

  if (isProductActiveWithoutItemId(data)) {
    logger.warn(
      `Product with ID ${id} is active but has no buy_box_winner item_id`
    )
    return setProductVariantsStatus(product, data)
  }

  if (data.buy_box_winner?.item_id) {
    logger.info(
      `Product with ID ${id} has buy_box_winner, fetching additional data`
    )
    return await fetchProductWithBuyBoxWinner(product, data)
  }

  return product as Product
}

const isProductInactive = (data: any) => data.status === "inactive"

const isProductActiveWithoutItemId = (data: any) =>
  data.status === "active" && !data.buy_box_winner?.item_id

const setProductVariantsStatus = (
  product: SingleProduct,
  data: any
): Product => {
  return {
    ...product,
    status: ProductAvailabilityStatus.HasVariants,
    description: data.short_description?.content || "",
    categories: "",
  } as Product
}

const setProductStatus = (
  product: SingleProduct,
  status: ProductAvailabilityStatus
): Product => {
  return {
    ...product,
    status,
  } as Product
}

const fetchProductWithBuyBoxWinner = async (
  product: SingleProduct,
  data: any
): Promise<Product> => {
  try {
    const { item_id: itemId, category_id: categoryId } = data.buy_box_winner
    logger.info(
      `Fetching description and categories for buy_box_winner item ID: ${itemId}`
    )

    const { description, categories } = await getDescriptionAndCategories(
      itemId,
      categoryId
    )

    logger.info(`Fetched description and categories for item ID: ${itemId}`)

    return {
      ...product,
      price: data.buy_box_winner.price,
      currency: data.buy_box_winner.currency_id,
      description:
        description?.data.plain_text ||
        description?.data.short_description ||
        "",
      categories: categories.length > 0 ? mapToCategory(categories) : "",
      status: ProductAvailabilityStatus.Available,
    } as Product
  } catch (error) {
    logger.error(
      `Error fetching data for buy_box_winner item ID: ${data.buy_box_winner.item_id}`,
      error
    )
    throw new Error("Error retrieving buy box winner data")
  }
}

const getDescriptionAndCategories = async (
  itemId: string,
  categoryId: string
) => {
  try {
    const [descriptionResult, categoriesResult] = await Promise.allSettled([
      axiosInstance.get(
        `${MercadoLibre.ITEMS}/${itemId}/${MercadoLibre.DESCRIPTION}`
      ),
      getCategories(categoryId),
    ])

    let description, categories

    if (descriptionResult.status === "fulfilled") {
      description = descriptionResult.value
      logger.info(`Description retrieved for item ID: ${itemId}`)
    } else {
      logger.error(
        `Error fetching description for item ID: ${itemId}`,
        descriptionResult.reason
      )
    }

    if (categoriesResult.status === "fulfilled") {
      categories = categoriesResult.value
      logger.info(`Categories retrieved for category ID: ${categoryId}`)
    } else {
      logger.error(
        `Error fetching categories for category ID: ${categoryId}`,
        categoriesResult.reason
      )
      categories = []
    }

    return { description, categories }
  } catch (error) {
    logger.error(
      `Error fetching description or categories for item ID: ${itemId} and category ID: ${categoryId}`,
      error
    )
    throw new Error("Error retrieving description and categories")
  }
}
