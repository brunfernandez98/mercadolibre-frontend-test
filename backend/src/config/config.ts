import dotenv from "dotenv"

dotenv.config()

export enum MercadoLibre {
  PRODUCTS = "/products",
  ITEMS = "items",
  DESCRIPTION = "description",
  CATEGORIES = "categories",
  TOKEN = "oauth/token",
}

export const config = {
  baseUrl: process.env.MERCADO_LIBRE_API_URL,
  frontendUrl: process.env.FRONTEND_URL,
  api_key: process.env.API_KEY,
  env: process.env.NODE_ENV,
}

export const context = {
  token: process.env.ACCESS_TOKEN,
  refresh_tokeen: process.env.REFRESH_TOKEN,
}
