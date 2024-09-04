import axiosInstance from "@/core/axiosInstance"

import { getCategories } from "@/services/categoryService"

jest.mock("@/core/axiosInstance")

const mockedAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>

describe("getCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return the path_from_root", async () => {
    const mockCategoryId = "MLA1234"

    const categories = {
      path_from_root: [
        {
          id: "MLA1276",
          name: "Deportes y Fitness",
        },
        {
          id: "MLA1309",
          name: "Básquet",
        },
        {
          id: "MLA1311",
          name: "Pelotas",
        },
      ],
    }

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: categories })

    const result = await getCategories(mockCategoryId)

    expect(result).toEqual(categories.path_from_root)
  })

  it("should throw an error ", async () => {
    const mockCategoryId = "MLA1234"

    mockedAxiosInstance.get.mockRejectedValueOnce(new Error("API Error"))

    await expect(getCategories(mockCategoryId)).rejects.toThrow(
      "Error retrieving categories"
    )
  })
})
