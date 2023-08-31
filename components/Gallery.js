import { useState, useEffect } from 'react'
import Image from 'next/image'
import Icon from './icons'

export default function Gallery({ images }) {
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentImageUrl, setCurrentImageUrl] = useState(images[0].url)
  const [currentImageAlt, setCurrentImageAlt] = useState(images[0].alt)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const closeModal = () => {
    setShowModal(false)
  }

  const openModal = () => {
    setShowModal(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    setCurrentImageUrl(images[currentImageIndex].url)
    setCurrentImageAlt(images[currentImageIndex].alt)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + images.length - 1) % images.length)
    setCurrentImageUrl(images[currentImageIndex].url)
    setCurrentImageAlt(images[currentImageIndex].alt)
  }

  return (
    <div>
      <Icon kind="gallery" onClick={openModal} />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 z-50 text-3xl text-white focus:outline-none"
          >
            &times;
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 transform text-3xl text-white focus:outline-none"
          >
            &#10094;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={currentImageUrl}
            alt={currentImageAlt}
            layout="fill"
            className="max-h-full max-w-full object-contain"
          />
          <button
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 transform text-3xl text-white focus:outline-none"
            onClick={nextImage}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  )
}
