import { formatCategories } from "helpers/formatters";
import { useLoadingContext } from "hooks/useLoadingContext";
import useProductById from "hooks/useProductById";

import { useEffect, useMemo } from "react";

import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import BreadCrumb from "@components/BreadCrumb/BreadCrumb";
import ProductCard from "@components/Card/ProductCard";
import NotFoundContainer from "@components/Container/NotFoundContainer";
import SkeletonCard from "@components/Loading/Skeleton";

const ProductPage = () => {
  const { id } = useParams<string>();
  const { product, loading, error } = useProductById(id);
  const { setLoading } = useLoadingContext();

  const formattedCategories = useMemo(() => {
    return product && product.categories
      ? formatCategories(product.categories)
      : [];
  }, [product]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  if (loading) return <SkeletonCard />;

  if (error) return <div>Error buscando el producto</div>;

  if (!product) {
    return (
      <NotFoundContainer
        isPage={false}
        message={`El producto con ID: ${id} no fue encontrado`}
      />
    );
  }

  if (!product) {
    return null;
  }

  const {
    id: id_product,
    name,
    pictures,
    description,
    price,
    currency,
    attributes,
    catalog_id,
    status,
  } = product;

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
        attributes={attributes}
        catalog_id={catalog_id}
        currency={currency}
        description={description}
        id={id_product}
        name={name}
        pictures={pictures}
        price={price}
        status={status}
      />
    </>
  );
};

export default ProductPage;
