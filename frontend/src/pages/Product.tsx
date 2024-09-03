import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/Card/ProductCard'
import BreadCrumb from '../components/BreadCrumb/BreadCrumb'
import useProductById from '../hooks/useProductById'
import { formatCategories } from '../helpers/formatters'
import SkeletonCard from '../components/Loading/Skeleton'
import NotFoundContainer from '../components/Container/NotFoundContainer'
import { useEffect, useMemo } from 'react'
import { useLoadingContext } from '../hooks/useSearchContext'

const ProductPage = () => {
  const { id } = useParams<string>()
  const { product, loading, error } = useProductById(id)
  const { setLoading } = useLoadingContext()

  const formattedCategories = useMemo(() => {
    return product ? formatCategories(product.categories) : []
  }, [product])

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  if (loading) return <SkeletonCard />

  if (error) return <div>Error buscando el producto</div>

  if (!product) {
    return (
      <NotFoundContainer
        isPage={false}
        message={`El producto con ID: ${id} no fue encontrado`}
      />
    )
  }

  if (!product) {
    return null
  }

  const {
    id: id_product,
    name,
    pictures,
    description,
    price,
    currency,
    attribute
  } = product

  return (
    <>
      <Helmet>
        <title>Mercado Libre producto id: {id}</title>
        <meta
          content={`Envíos Gratis en el día Compre ${product.name} en cuotas sin interés!`}
          name="description"
        />
      </Helmet>
      <BreadCrumb paths={formattedCategories} />
      <ProductCard
        attributes={attribute}
        currency={currency}
        description={description}
        id={id_product}
        name={name}
        pictures={pictures}
        price={price}
      />
    </>
  )
}

export default ProductPage
