import { Product } from "@domain/Product";
import { ServerEndpoints, config } from "@endpoints/config";

import { coreFetch } from "./coreFetch";

export const getProductById = async (
  id: string | number,
): Promise<Product | null> => {
  const url = `${config.baseUrl}${ServerEndpoints.PRODUCTS}/${id}`;

  const response = await coreFetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Error fetching one product with ID ${id}: ${response.statusText}`,
    );
  }

  const data = await response.json();

  const product: Product = {
    id: data?.id,
    catalog_id: data?.id,
    name: data?.name,
    attributes: data?.attributes,
    description: data?.description,
    pictures: data?.pictures,
    price: data?.price,
    categories: data?.categories,
    currency: data?.currency,
    status: data?.status,
  };

  return product;
};
