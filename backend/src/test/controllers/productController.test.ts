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
    const mockProductData = {
      id: "MLA123456",
      name: "Sample Product",
      attributes: [{ id: "BRAND", name: "Brand", value_name: "BrandName" }],
      pictures: [{ id: "1", url: "http://meliexample.com/image.jpg" }],
      currency: "USD",
      price: 100,
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
