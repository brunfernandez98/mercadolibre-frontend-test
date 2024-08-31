import axios from "axios"

import { getProductData } from "@/services/productService"

import { MercadoLibre } from "@/config/endpoints"

jest.mock("axios")

const mockedAxios = axios as jest.Mocked<typeof axios>

describe("getProductData", () => {
  it("should return a product domain", async () => {
    const mockId = "MLA123456"

    const mockResponseData = {
      id: mockId,
      title: "Playstation5",
      pictures: [{ id: "1", url: "http://image.url" }],
      price: 500,
      currency_id: "USD",
      category_id: "MLA1590",
    }

    const mockDescriptionData = {
      plain_text: "The PlayStation 5 is a home video game console",
    }

    const mockCategories = "Electrónica | Game | VideoGame"

    mockedAxios.get
      .mockResolvedValueOnce({ data: mockResponseData })
      .mockResolvedValueOnce({ data: mockDescriptionData })

    jest.mock("@/services/categoryService", () => ({
      getCategories: jest.fn().mockResolvedValue(mockCategories),
    }))

    const result = await getProductData(mockId)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.MERCADO_LIBRE_API_URL}${MercadoLibre.PRODUCTS}/${mockId}`
    )

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.MERCADO_LIBRE_API_URL}/items/${mockId}/description`
    )

    expect(result).toEqual({
      id: mockResponseData.id,
      name: mockResponseData.title,
      pictures: mockResponseData.pictures,
      currency: mockResponseData.currency_id,
      price: mockResponseData.price,
      description: mockDescriptionData.plain_text,
      categories: mockCategories,
    })

    expect(result).toHaveProperty("id")
    expect(result).toHaveProperty("name")
    expect(result).toHaveProperty("pictures")
    expect(result).toHaveProperty("currency")
    expect(result).toHaveProperty("price")
    expect(result).toHaveProperty("description")
    expect(result).toHaveProperty("categories")
  })
})
