export enum MercadoLibre {
  PRODUCTS = "/products",
  DESCRIPTION = "/description",
  CATEGORIES = "/categories",
}

export const config = {
  baseUrl: process.env.MERCADO_LIBRE_API_URL,
}
