import React, { ReactNode } from 'react'

import './overlay.scss'

interface PropsInterface {
  children: ReactNode
  display?: boolean
  setDisplay: (value: boolean) => void
}

export default function Overlay({
  display = true,
  children,
  setDisplay
}: PropsInterface) {
  const clickOverlay = () => {
    setDisplay(false)
  }

  return (
    <div className="Overlay">
      {display && (
        <div className="Overlay-container" onClick={clickOverlay}>
          {children}
        </div>
      )}
    </div>
  )
}
