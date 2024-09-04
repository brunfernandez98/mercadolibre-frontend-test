import axiosInstance from "@/core/axiosInstance"

import { getCategories } from "@/services/categoryService"
import { getProductData } from "@/services/productService"

jest.mock("@/core/axiosInstance")
jest.mock("@/services/categoryService")

const mockedAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>
const mockedGetCategories = getCategories as jest.MockedFunction<
  typeof getCategories
>

describe("getProductData", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return a product domain", async () => {
    const mockId = "MLA123456"

    const mockProductData = {
      id: "MLA123456",
      status: "active",
      title: "Play 5",
      catalog_id: "MLA123456",
      pictures: [{ id: "1", url: "http://meliexample.com/image.jpg" }],
      buy_box_winner: {
        item_id: "123",
        category_id: "MLA567",
        price: 100,
        currency_id: "USD",
      },

      short_description: { content: "Product description" },
    }

    const mockDescriptionData = {
      plain_text: "The PlayStation 5 is a home video game console developed",
    }

    const mockCategories = [
      {
        id: "MLA1276",
        name: "VideoGame",
      },
      {
        id: "MLA1309",
        name: "Consola",
      },
      {
        id: "MLA1311",
        name: "Play 5",
      },
    ]

    mockedAxiosInstance.get
      .mockResolvedValueOnce({ data: mockProductData })
      .mockResolvedValueOnce({ data: mockDescriptionData })

    mockedGetCategories.mockResolvedValueOnce(mockCategories)

    const result = await getProductData(mockId)

    expect(result).toEqual({
      id: mockProductData.id,
      name: mockProductData.title,
      catalog_id: mockProductData.catalog_id,
      pictures: mockProductData.pictures,
      currency: mockProductData.buy_box_winner.currency_id,
      price: mockProductData.buy_box_winner.price,
      description: mockDescriptionData.plain_text,
      categories: "VideoGame | Consola | Play 5",
      status: "available",
    })
  })

  it("should return a product with status 'unavailable' when the product is inactive", async () => {
    const mockId = "MLA123456"

    const mockProductData = {
      id: "MLA123456",
      status: "inactive",
      title: "Play 5",
      catalog_id: "MLA123456",
      pictures: [{ id: "1", url: "http://meliexample.com/image.jpg" }],
      short_description: { content: "Product description" },
    }

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockProductData })

    const result = await getProductData(mockId)

    expect(result).toEqual({
      id: mockProductData.id,
      name: mockProductData.title,
      catalog_id: mockProductData.catalog_id,
      pictures: mockProductData.pictures,
      status: "unavailable",
      attributes: undefined,
    })
  })

  it("should return a product with status 'has_variants' when the product is active but without a buy_box_winner", async () => {
    const mockId = "MLA123456"

    const mockProductData = {
      id: "MLA123456",
      status: "active",
      title: "Play 5",
      catalog_id: "MLA123456",
      pictures: [{ id: "1", url: "http://meliexample.com/image.jpg" }],
      short_description: { content: "Product description" },
    }

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockProductData })

    const result = await getProductData(mockId)

    expect(result).toEqual({
      id: mockProductData.id,
      name: mockProductData.title,
      catalog_id: mockProductData.catalog_id,
      pictures: mockProductData.pictures,
      description: mockProductData.short_description.content,
      categories: "",
      status: "has_variants",
    })
  })

  it("should handle error when getCategories fails", async () => {
    const mockId = "MLA123456"

    const mockProductData = {
      id: "MLA123456",
      status: "active",
      title: "Play 5",
      catalog_id: "MLA123456",
      pictures: [{ id: "1", url: "http://meliexample.com/image.jpg" }],
      buy_box_winner: {
        item_id: "123",
        category_id: "MLA567",
        price: 100,
        currency_id: "USD",
      },
    }

    const mockDescriptionData = {
      plain_text: "The PlayStation 5 is a home video game console developed",
    }

    mockedAxiosInstance.get
      .mockResolvedValueOnce({ data: mockProductData })
      .mockResolvedValueOnce({ data: mockDescriptionData })

    mockedGetCategories.mockRejectedValueOnce(
      new Error("Error fetching categories")
    )

    const result = await getProductData(mockId)

    expect(result).toEqual({
      id: mockProductData.id,
      name: mockProductData.title,
      catalog_id: mockProductData.catalog_id,
      pictures: mockProductData.pictures,
      currency: mockProductData.buy_box_winner.currency_id,
      price: mockProductData.buy_box_winner.price,
      description: mockDescriptionData.plain_text,
      categories: "",
      status: "available",
    })
  })
})
