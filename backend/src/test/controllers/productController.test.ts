import { Product, ProductAvailabilityStatus } from "@/models/product"
import { NextFunction, Request, Response } from "express"

import { getProductById } from "@/controllers/productController"

import { getProductData } from "@/services/productService"

jest.mock("@/services/productService")

const mockedGetProductData = getProductData as jest.MockedFunction<
  typeof getProductData
>

describe("getProductById Controller", () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: jest.MockedFunction<NextFunction>

  beforeEach(() => {
    req = {
      params: {
        id: "MLA123456",
      },
    }
    res = {
      json: jest.fn(),
    }
    next = jest.fn()
  })

  it("should respond with product data when getProductData resolves", async () => {
    const mockProductData: Product = {
      id: "MLA123456",
      catalog_id: "MLA123456",
      name: "PlayStation 5",
      categories: "GAME#CONSOLE#PLAY",
      pictures: [{ id: "1", url: "http://meliexample.com/image.jpg" }],
      currency: "USD",
      price: 100,
      description: "PLAY5 description.",
      status: ProductAvailabilityStatus.Available,
    }

    mockedGetProductData.mockResolvedValueOnce(mockProductData)

    await getProductById(req as Request, res as Response, next)

    expect(mockedGetProductData).toHaveBeenCalledWith("MLA123456")
    expect(res.json).toHaveBeenCalledWith(mockProductData)
    expect(next).not.toHaveBeenCalled()
  })

  it("should call next with an error when getProductData rejects", async () => {
    const mockError = new Error("API Error")

    mockedGetProductData.mockRejectedValueOnce(mockError)

    await getProductById(req as Request, res as Response, next)

    expect(mockedGetProductData).toHaveBeenCalledWith("MLA123456")
    expect(next).toHaveBeenCalledWith(mockError)
    expect(res.json).not.toHaveBeenCalled()
  })
})
