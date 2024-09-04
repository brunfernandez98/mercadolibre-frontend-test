import dotenv from "dotenv"

dotenv.config()

export enum MercadoLibre {
  PRODUCTS = "/products",
  ITEMS = "items",
  DESCRIPTION = "description",
  CATEGORIES = "categories",
}

export const config = {
  baseUrl: process.env.MERCADO_LIBRE_API_URL,
  frontendUrl: process.env.FRONTEND_URL,
  token: process.env.ACCESS_TOKEN,
  api_key: process.env.API_KEY,
  env: process.env.NODE_ENV,
}
