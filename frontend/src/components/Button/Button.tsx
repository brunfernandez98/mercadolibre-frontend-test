import React, { ReactNode } from 'react'
import './Button.scss'

interface ButtonProps {
  variant?: 'primary' | 'text'
  children: ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  children
}) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {children}{' '}
    </button>
  )
}

export default Button
