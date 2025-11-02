import React from 'react'
import HeroSession from '../components/HeroSession'
import FeatureSession from '../components/FeatureSession'

function Home() {
  return (
    <div className='bg-bg-main min-h-screen'>
      <HeroSession/>
      <FeatureSession/>
    </div>
  )
}
 
export default Home