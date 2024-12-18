import React from 'react'
import Gallery from './Components/Gallery'
import './App.css'

function App() {
  return (
    <div className="App">
      <Gallery 
        imageCount={3} 
        endpoint="neko"
      />
      <Gallery 
        imageCount={3} 
        endpoint="pat"
      />
      <Gallery 
        imageCount={3} 
        endpoint="smug"
      />
    </div>
  )
}

export default App