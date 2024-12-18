import React, { useState } from 'react'

function ImageDisplay({ images, onImageClick }) {
  const [fullscreenImage, setFullscreenImage] = useState(null)

  const handleFullscreen = (image) => {
    setFullscreenImage(image)
    if (onImageClick) {
      onImageClick(image)
    }
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  return (
    <>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px' 
      }}>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img 
              src={image} 
              alt={`Image ${index + 1}`} 
              style={{ 
                width: '300px', 
                height: '300px', 
                objectFit: 'cover', 
                borderRadius: '10px',
                cursor: 'pointer'
              }}
              onClick={() => handleFullscreen(image)}
            />
          </div>
        ))}
      </div>

      {fullscreenImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={closeFullscreen}
        >
          <img 
            src={fullscreenImage} 
            alt="Fullscreen" 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain'
            }}
          />
        </div>
      )}
    </>
  )
}

export default ImageDisplay