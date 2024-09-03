type ValueType =
  | "string"
  | "number"
  | "number_unit"
  | "boolean"
  | "list"
  | "product_identifier"

export interface Attribute {
  id: string
  name: string
  value_id?: string | null
  value_name: string
  value_type: ValueType
}
