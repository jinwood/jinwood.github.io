import { useState } from 'react'
import Image from 'next/image'
import Icon from './icons'

export default function Gallery({ images }) {
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [currentImageAlt, setCurrentImageAlt] = useState('')

  const closeModal = () => {
    setShowModal(false)
  }

  const openModal = () => {
    console.log('open modal')
    setShowModal(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    setCurrentImageUrl(images[currentImageIndex].url)
    setCurrentImageAlt(images[currentImageIndex].alt)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + images.length - 1) % images.length)
  }

  console.log(images)
  console.log('url', currentImageUrl)
  console.log('alt', currentImageAlt)

  return (
    <div>
      <Icon kind="gallery" onClick={openModal} />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 text-3xl text-white focus:outline-none"
          >
            &times;
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 transform text-3xl text-white focus:outline-none"
          >
            &#10094;
          </button>
          <Image
            src={currentImageUrl}
            alt={currentImageAlt}
            className="max-h-full max-w-full object-contain"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-3xl text-white focus:outline-none"
            onClick={nextImage}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  )
}
