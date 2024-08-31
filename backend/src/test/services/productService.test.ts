import axios from "axios"

import { getCategories } from "@/services/categoryService"
import { getProductData } from "@/services/productService"

jest.mock("axios")
jest.mock("@/services/categoryService")

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedGetCategories = getCategories as jest.MockedFunction<
  typeof getCategories
>

describe("getProductData", () => {
  it("should return a product domain", async () => {
    const mockId = "MLA123456"

    const mockResponseData = {
      id: mockId,
      title: "PlayStation 5",
      pictures: [{ id: "1", url: "http://image.url" }],
      price: 499.99,
      currency_id: "USD",
      category_id: "MLA1590",
    }

    const mockDescriptionData = {
      plain_text: "The PlayStation 5 is a home video game console developed",
    }

    const mockCategories = "Electrónica | Videojuegos | Consolas"

    mockedAxios.get
      .mockResolvedValueOnce({ data: mockResponseData })
      .mockResolvedValueOnce({ data: mockDescriptionData })

    mockedGetCategories.mockResolvedValueOnce(mockCategories)

    const result = await getProductData(mockId)

    expect(result).toEqual({
      id: mockResponseData.id,
      name: mockResponseData.title,
      pictures: mockResponseData.pictures,
      currency: mockResponseData.currency_id,
      price: mockResponseData.price,
      description: mockDescriptionData.plain_text,
      categories: mockCategories,
    })
  })
})
