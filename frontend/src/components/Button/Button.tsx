import React, { ReactNode } from 'react'
import './Button.scss'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  children: ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children }) => {
  return <button className={`button ${variant}`}>{children} </button>
}

export default Button
