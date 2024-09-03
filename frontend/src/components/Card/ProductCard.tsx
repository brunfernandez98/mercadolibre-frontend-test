import React from 'react'
import './ProductCard.scss'

import { formatPrice, formatText } from '../../helpers/formatters'
import Slider from '../Slider/Slider'
import Button from '../Button/Button'
import { Attribute } from '../../domain/attribute'

interface ProductCardProps {
  id: string
  name: string
  pictures: Array<{ id: string; url: string }>
  currency: string
  price: number
  description: string
  attributes: Array<Attribute>
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  pictures,
  currency,
  price,
  description,
  attributes
}) => {
  const formattedPrice = formatPrice(price, currency)

  return (
    <div className="product-card">
      <div className="product-content">
        <div className="product-images">
          <Slider pictures={pictures} />
        </div>
        <div className="product-details">
          <span className="product-id">Código de catálogo: {id}</span>
          <h2 className="product-name">{name}</h2>
          <span className="product-price">{formattedPrice}</span>
          <Button variant="primary">Comprar</Button>
          <div className="product-attributes">
            {attributes?.map((attribute) => (
              <span key={attribute.id}>
                {attribute.name}: {attribute.value_name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="product-description-section">
        <p className="product-description">{formatText(description)}</p>
      </div>
    </div>
  )
}

export default ProductCard
