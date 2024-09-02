import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import './Slider.scss'

interface SliderProps {
  pictures: Array<{ id: string; url: string }>
}

const Slider: React.FC<SliderProps> = ({ pictures }) => {
  const [showIndex, setShowIndex] = useState<number>(0)

  const nextImage = () => {
    setShowIndex((currentIndex) => (currentIndex + 1) % pictures.length)
  }

  const prevImage = () => {
    setShowIndex(
      (currentIndex) => (currentIndex - 1 + pictures.length) % pictures.length
    )
  }

  return (
    <div className="slider">
      <div className="slides">
        {pictures.map((picture, index) => (
          <div
            key={picture.id}
            style={{
              display: index === showIndex ? 'block' : 'none'
            }}
          >
            <img
              alt={`Producto Mercado Libre : ${index + 1}`}
              className="slides__image"
              src={picture.url}
            />
          </div>
        ))}
      </div>

      <button className="nav nav-left" onClick={prevImage}>
        <FaArrowLeft />
      </button>
      <button className="nav nav-right" onClick={nextImage}>
        <FaArrowRight />
      </button>
    </div>
  )
}

export default Slider
