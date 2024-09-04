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
  const responseProduct = await axiosInstance.get(
    `${MercadoLibre.PRODUCTS}/${id}`
  )
  const data = responseProduct.data

  let product: SingleProduct = mapToSingleProduct(data)

  if (data.status === "inactive") {
    product = {
      ...product,
      status: ProductAvailabilityStatus.Unavailable,
    } as Product
  } else if (data.status === "active" && !data.buy_box_winner?.item_id) {
    product = {
      ...product,
      status: ProductAvailabilityStatus.HasVariants,
      description: data.short_description?.content || "",
      categories: "",
    } as Product
  } else if (data.buy_box_winner?.item_id) {
    const itemId = data.buy_box_winner.item_id
    const category_id = data.buy_box_winner.category_id

    const { description, categories } = await getDescriptionAndCategories(
      itemId,
      category_id
    )

    product = {
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
  }

  return product as Product
}

const getDescriptionAndCategories = async (
  itemId: string,
  categoryId: string
) => {
  try {
    const [responseDescription, categories] = await Promise.all([
      axiosInstance.get(
        `${MercadoLibre.ITEMS}/${itemId}/${MercadoLibre.DESCRIPTION}`
      ),
      getCategories(categoryId),
    ])

    return { description: responseDescription, categories }
  } catch (error) {
    console.error("Error fetching description and categories:", error)
    return { description: undefined, categories: [] }
  }
}
