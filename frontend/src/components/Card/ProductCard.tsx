import React, { useState } from 'react'
import './ProductCard.scss'

import { formatPrice, formatText } from '../../helpers/formatters'
import Slider from '../Slider/Slider'
import Button from '../Button/Button'

import Modal from '../Modal/Modal'
import { Attribute } from '../../domain/Attribute'

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
  const [showMore, setShowMore] = useState(false)
  const formattedPrice = formatPrice(price, currency)

  const handleShowMore = () => {
    setShowMore(true)
  }

  const handleCloseModal = () => {
    setShowMore(false)
  }

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
          <h3>Lo que tenes que saber del producto</h3>
          <ul className="product-attributes">
            {attributes.slice(0, 5).map((attribute) => (
              <li key={attribute.id}>
                {attribute.name}: {attribute.value_name}
              </li>
            ))}
          </ul>
          {attributes.length > 5 && (
            <div>
              <Button variant="text" onClick={handleShowMore}>
                Ver más caracteristicas
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="product-description-section">
        <p className="product-description">{formatText(description)}</p>
      </div>
      {showMore && (
        <Modal onClose={handleCloseModal}>
          <div className="product-attributes">
            {attributes.map((attribute) => (
              <div key={attribute.id} className="product-attribute-item">
                <strong>{attribute.name}:</strong> {attribute.value_name}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ProductCard
