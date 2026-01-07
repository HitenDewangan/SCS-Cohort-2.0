import React from 'react'
import Navbar from './components/Navbar'
import HeroImage from './components/HeroImage'
import HeroText from './components/HeroText'
import Stats from './components/Stats'

const App = () => {
  return (
    <div>
      <Navbar/>
      <HeroText/>
      <Stats/>
      <HeroImage/>
    </div>
  )
}

export default App
