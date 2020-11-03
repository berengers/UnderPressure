import React from 'react'

import loader from 'Static/loader.gif'
import './loader.scss'

interface PropsInterface {
  button?: boolean
  display?: boolean
  large?: boolean
  size?: string
  style?: any
}

export default function Loader({
  button = false,
  display = true,
  large = false,
  size = '36px',
  style
}: PropsInterface) {
  const loaderSize = large ? '50px' : size

  return (
    <div className={`Loader  ${!display ? 'displayNone' : ''}`}>
      <div className={`Loader-imageContainer ${button ? 'buttonMode' : ''}`}>
        <img
          src={loader}
          alt="loader"
          width={loaderSize}
          className="Loader-image"
          style={style}
        />
      </div>
    </div>
  )
}
