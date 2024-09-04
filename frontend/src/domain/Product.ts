import { Attribute } from "./Attribute";

export interface Product {
  id: string;
  catalog_id: string;
  name: string;
  pictures?: Array<{ id: string; url: string }>;
  currency: string;
  price: number;
  description: string;
  categories?: string;
  attributes?: Attribute[];
  status: ProductAvailabilityStatus;
}

type ProductAvailabilityStatus = "available" | "unavailable" | "has_variants";
