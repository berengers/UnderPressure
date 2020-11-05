import React, { MouseEvent, ReactNode } from 'react'

import './modal.scss'
import Overlay from 'Lib/overlay/overlay'

interface PropsInterface {
  children: ReactNode
  display?: boolean
  setDisplay: (value: boolean) => void
}

export default function Modal({
  display = true,
  children,
  setDisplay
}: PropsInterface) {
  const clickOverlay = () => {
    setDisplay(false)
  }

  const clickCard = (event: MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <div className="Modal">
      <Overlay display={display} setDisplay={clickOverlay}>
        <div className="Modal-card" onClick={clickCard}>
          {children}
        </div>
      </Overlay>
    </div>
  )
}
