import { Attribute } from "./attribute"

export interface SingleProduct {
  id: string
  catalog_id: string
  name: string
  pictures: Array<{ id: string; url: string }>
  attributes?: Attribute[]
}

export interface Product {
  id: string
  catalog_id: string
  name: string
  pictures: Array<{ id: string; url: string }>
  currency: string
  price: number
  description: string
  categories?: string
  attributes?: Attribute[]
  status: string
}

export const mapToSingleProduct = (responseData: any): SingleProduct => {
  return {
    id: responseData?.id,
    catalog_id: responseData?.catalog_id,
    name: responseData?.title,
    pictures: responseData?.pictures?.map((pic: any) => ({
      id: pic.id,
      url: pic.url,
    })),
    attributes: responseData?.attributes,
  }
}

export const enum ProductAvailabilityStatus {
  Available = "available",
  Unavailable = "unavailable",
  HasVariants = "has_variants",
}
