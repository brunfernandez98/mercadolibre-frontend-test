import { useState, useEffect } from 'react'
import { getProductById } from '../services/getProductById'
import { Product } from '../domain/Product'

const useProductById = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        const productData = await getProductById(id)
        setProduct(productData)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}

export default useProductById
