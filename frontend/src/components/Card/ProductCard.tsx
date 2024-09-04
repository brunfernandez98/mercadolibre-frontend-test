import React, { useState } from "react";

import { Attribute } from "../../domain/Attribute";
import { formatPrice, formatText } from "../../helpers/formatters";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Slider from "../Slider/Slider";
import AlertMessage from "./AlertMessageCard";
import "./ProductCard.scss";

interface ProductCardProps {
  id: string;
  catalog_id: string;
  name: string;
  pictures?: Array<{ id: string; url: string }>;
  currency: string;
  price: number;
  status: string;
  description: string;
  attributes?: Array<Attribute>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  catalog_id,
  name,
  pictures = [],
  currency,
  price,
  status,
  description,
  attributes,
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleCloseModal = () => {
    setShowMore(false);
  };

  return (
    <div className="product-card">
      <div className="product-content">
        <div className="product-images">
          {pictures.length > 0 ? (
            <Slider pictures={pictures} />
          ) : (
            <p className="no-images-message">
              <i className="icon-warning"></i> No hay imágenes disponibles
            </p>
          )}
        </div>
        <div className="product-details">
          <span className="product-id">Código de catálogo: {catalog_id}</span>
          <h2 className="product-name">{name}</h2>
          {status === "has_variants" ? (
            <AlertMessage
              message="Este producto no está disponible. Elige otra variante."
              variant="inactive"
            />
          ) : status === "unavailable" ? (
            <AlertMessage
              message="Este producto no esta disponible."
              variant="variants"
            />
          ) : (
            <>
              <span className="product-price">
                {formatPrice(price, currency)}
              </span>
              <Button variant="primary">Comprar</Button>
            </>
          )}

          <h3>Lo que tenes que saber del producto</h3>
          <ul className="product-attributes">
            {attributes?.slice(0, 5).map((attribute) => (
              <li key={attribute.id}>
                {attribute.name}: {attribute.value_name}
              </li>
            ))}
          </ul>
          {attributes && attributes.length > 5 && (
            <div>
              <Button disabled={false} variant="text" onClick={handleShowMore}>
                Ver más características
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="product-description-section">
        {description && (
          <p className="product-description">{formatText(description)}</p>
        )}
      </div>
      {showMore && (
        <Modal onClose={handleCloseModal}>
          <div className="product-attributes">
            {attributes?.map((attribute) => (
              <div key={attribute.id} className="product-attribute-item">
                <strong>{attribute.name}:</strong> {attribute.value_name}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductCard;
