import { useState, useEffect, useCallback } from 'react'
import Icon from './icons'

export default function Gallery({ images }) {
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentImage, setCurrentImage] = useState(images[0])

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const openModal = () => {
    setShowModal(true)
  }

  const nextImage = useCallback(() => {
    console.log('next')
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + images.length - 1) % images.length)
  }, [images])

  useEffect(() => {
    setCurrentImage(images[currentImageIndex])
  }, [currentImageIndex, images])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
      if (event.key === 'ArrowLeft') {
        prevImage()
      }
      if (event.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal, prevImage, nextImage])
  return (
    <div>
      <Icon kind="gallery" onClick={openModal} />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-black bg-opacity-80">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 z-50 text-3xl text-white focus:outline-none"
          >
            &times;
          </button>
          <div
            onClick={prevImage}
            className="absolute left-4 top-1/2 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-black"
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="z-50 text-2xl text-white focus:outline-none"
            >
              &#10094;
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={currentImage.url}
            alt={currentImage.alt}
            className="max-h-full max-w-full object-contain"
          />

          <div
            className="absolute right-4 top-1/2 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-black"
            onClick={nextImage}
          >
            <button
              className="align-middle text-2xl text-white focus:outline-none"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
