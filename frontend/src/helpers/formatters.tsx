import React from 'react'

export const formatCategories = (categories: string): string[] => {
  return categories.split('#')
}

export const formatPrice = (
  price: number,
  currency: string,
  locale: string = 'es-AR'
) => {
  return Math.round(price).toLocaleString(locale, {
    style: 'currency',
    currency: currency
  })
}

export const formatText = (text: string) => {
  const formattedText = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))

  return formattedText
}
