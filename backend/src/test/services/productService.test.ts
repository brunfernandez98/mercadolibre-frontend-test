import axios from "axios"

import { getProductData } from "@/services/productService"

import { MercadoLibre } from "@/config/endpoints"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("getProductData", () => {
  it("should return only name, attributes, and pictures from the response", async () => {
    const mockId = "MLA123456"
    const mockResponseData = {
      id: "MLA123456",
      name: "Product Name",
      attributes: [{ id: "BRAND", name: "Brand", value_name: "BrandName" }],
      pictures: [{ id: "1", url: "http://image.url" }],
      price: 100,
      currency_id: "USD",
      seller_id: 12345,
      site_id: "MLA",
    }

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData })

    const result = await getProductData(mockId)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.MERCADO_LIBRE_API_URL}${MercadoLibre.PRODUCTS}/${mockId}`
    )

    expect(result).toEqual({
      name: mockResponseData.name,
      attributes: mockResponseData.attributes,
      pictures: mockResponseData.pictures,
    })

    expect(result).not.toHaveProperty("price")
    expect(result).not.toHaveProperty("currency_id")
    expect(result).not.toHaveProperty("seller_id")
  })
})
