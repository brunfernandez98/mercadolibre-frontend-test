export enum ServerEndpoints {
  PRODUCTS = "/products",
}

export const config = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  api_key: import.meta.env.VITE_API_KEY,
};
