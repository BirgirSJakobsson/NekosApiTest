import React, { useState, useEffect } from 'react'
import { fetchImages, NEKOS_ENDPOINTS } from './nekoUtils'
import ImageDisplay from './ImageDisplay'

function Gallery({ 
  imageCount = 3, 
  title, 
  endpoint = 'neko' 
}) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoadingNew, setIsLoadingNew] = useState(false)

  // Generate a default title if not provided
  const galleryTitle = title || `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Gallery`

  const loadImages = async () => {
    // Prevent multiple simultaneous image fetches
    if (isLoadingNew) return

    setIsLoadingNew(true)
    setError(null)

    try {
      const newImages = await fetchImages(imageCount, endpoint)
      setImages(newImages)
      setLoading(false)
    } catch (err) {
      setError(`Failed to fetch ${endpoint} images`)
      setLoading(false)
    } finally {
      setIsLoadingNew(false)
    }
  }

  useEffect(() => {
    loadImages()
  }, [imageCount, endpoint])

  if (loading && !isLoadingNew) return <div>Initial Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="Gallery">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <button 
          onClick={loadImages}
          disabled={isLoadingNew}
          style={{
            padding: '10px 20px',
            backgroundColor: isLoadingNew ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoadingNew ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoadingNew ? 'Loading...' : 'Fetch New Images'}
        </button>
        <h1>{galleryTitle}</h1>
      </div>
      {!loading && (
        <ImageDisplay 
          images={images} 
          onImageClick={(image) => console.log('Image clicked:', image)}
        />
      )}
    </div>
  )
}

export default Gallery