import { Attribute } from './Attribute'

export interface Product {
  id: string
  name: string
  description: string
  pictures: { id: string; url: string }[]
  price: number
  currency: string
  categories: string
  attribute: Attribute[]
}
