import { Product } from '../domain/Product'
import { config, ServerEndpoints } from '../endpoints/endpoints'

export const getProductById = async (
  id: string | number
): Promise<Product | null> => {
  const url = `${config.baseUrl}${ServerEndpoints.PRODUCTS}/${id}`

  const response = await fetch(url)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      `Error fetching one product with ID ${id}: ${response.statusText}`
    )
  }

  const data = await response.json()

  const product: Product = {
    id: data.id,
    name: data.name,
    attribute: data.attributes,
    description: data.description,
    pictures: data.pictures,
    price: data.price,
    categories: data.categories,
    currency: data.currency
  }

  return product
}
