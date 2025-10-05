import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!mounted) return null

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  )
}
