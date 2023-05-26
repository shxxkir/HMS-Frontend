import React from 'react'
import Ad from './Ad'
import Footer from './Footer'
import Award from './Award'
import EmergencyContact from './EmergencyContact'
import News from './News'
import Hero from './Hero'


function Home() {
  return (
    <div>
      <Ad/>
      <Hero />
      <Award />
      <News />
      <EmergencyContact />
      <Footer />
    </div>
  )
}

export default Home
