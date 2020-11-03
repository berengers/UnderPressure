import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import './button.scss'

interface ButtonInterface {
  children: ReactNode
  className?: string
  color?: string
  fullWidth?: boolean
  light?: boolean
  onClick?: () => void
  text?: boolean
  to?: string
}

export default function Button({
  children,
  className,
  color = '',
  fullWidth,
  light,
  onClick,
  text,
  to
}: ButtonInterface) {
  return (
    <Link to={to || '#'} onClick={onClick}>
      <div
        className={`
        Button
        ${className} ${fullWidth ? 'Button--fullWidth' : ''}
        ${text ? 'Button--text' : ''}
        ${light ? 'Button--light' : ''}
        `}
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </Link>
  )
}
