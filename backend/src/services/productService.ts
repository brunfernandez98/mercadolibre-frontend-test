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

// Función principal
export const getProductData = async (
  id: string
): Promise<Product | undefined> => {
  const responseProduct = await axiosInstance.get(
    `${MercadoLibre.PRODUCTS}/${id}`
  )
  const data = responseProduct.data

  let product: SingleProduct = mapToSingleProduct(data)

  if (isProductInactive(data)) {
    return setProductStatus(product, ProductAvailabilityStatus.Unavailable)
  }

  if (isProductActiveWithoutItemId(data)) {
    return setProductVariantsStatus(product, data)
  }

  if (data.buy_box_winner?.item_id) {
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
  const { item_id: itemId, category_id: categoryId } = data.buy_box_winner

  const { description, categories } = await getDescriptionAndCategories(
    itemId,
    categoryId
  )

  return {
    ...product,
    price: data.buy_box_winner.price,
    currency: data.buy_box_winner.currency_id,
    description:
      description?.data.plain_text || description?.data.short_description || "",
    categories: categories.length > 0 ? mapToCategory(categories) : "",
    status: ProductAvailabilityStatus.Available,
  } as Product
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
