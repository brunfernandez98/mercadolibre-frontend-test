export interface Product {
  id: string
  name: string
  pictures: Array<{ id: string; url: string }>
  currency: string
  price: number
  description: string
  categories: string
}

export const mapToProduct = (responseData: any): Product => {
  return {
    id: responseData.id,
    name: responseData.title,
    pictures: responseData.pictures.map((pic: any) => ({
      id: pic.id,
      url: pic.url,
    })),
    currency: responseData.currency_id,
    price: responseData.price,
    description: responseData.description,
    categories: responseData.categories,
  }
}
