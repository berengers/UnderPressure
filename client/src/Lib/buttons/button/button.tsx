import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import './button.scss'

interface ButtonInterface {
  children: ReactNode
  className?: string
  color?: string
  disable?: boolean
  fullWidth?: boolean
  dark?: boolean
  onClick?: () => void
  small?: boolean
  text?: boolean
  to?: string
}

export default function Button({
  children,
  className,
  color = '',
  disable = false,
  fullWidth = false,
  dark = false,
  onClick,
  small = false,
  text = false,
  to
}: ButtonInterface) {
  const clickButton = () => {
    if (disable) return
    if (onClick) onClick()
  }

  return (
    <Link onClick={clickButton} to={to || '#'}>
      <div
        className={`
        Button
        ${className} ${fullWidth ? 'Button--fullWidth' : ''}
        ${text ? 'Button--text' : ''}
        ${dark ? 'Button--dark' : ''}
        ${disable ? 'Button--disable' : ''}
        ${small ? 'Button--small' : ''}
        `}
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </Link>
  )
}
