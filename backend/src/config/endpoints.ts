export enum MercadoLibre {
  PRODUCTS = "/items",
  DESCRIPTION = "/description",
  CATEGORIES = "/categories",
}

export const config = {
  baseUrl: process.env.MERCADO_LIBRE_API_URL,
}
