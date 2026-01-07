import React from 'react'
import heroImage from '../assets/hero-image.png'

const HeroImage = () => {
  return (
    <div className='hero-section'>
        <img className='hero-image' src={heroImage} alt="Hero" /> 
    </div>
  )
}

export default HeroImage
