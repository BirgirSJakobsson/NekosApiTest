// Utility functions for fetching images from nekos.best API
export const fetchImages = async (imageCount = 3, endpoint = 'neko') => {
  try {
    // Fetch unique images based on imageCount and endpoint
    const imagePromises = Array(imageCount).fill().map(async () => {
      const response = await fetch(`https://nekos.best/api/v2/${endpoint}`)
      const data = await response.json()
      return data.results[0].url
    })
    
    return await Promise.all(imagePromises)
  } catch (err) {
    console.error(`Failed to fetch ${endpoint} images:`, err)
    throw err
  }
}

// List of available endpoints
export const NEKOS_ENDPOINTS = [
  'neko',
  'pat',
  'smug',
  // Add more endpoints as they become available
]