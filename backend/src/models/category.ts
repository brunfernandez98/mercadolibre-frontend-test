export interface Category {
  id: string
  name: string
}

export const mapToCategory = (
  categories: Category[],
  separator: string = " | "
): string => {
  return categories.map(category => category.name).join(separator)
}
