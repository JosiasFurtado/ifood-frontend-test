import React from 'react'
import { NextSeo } from 'next-seo'
import Menu from '~/components/Menu'
import MusicSection from '~/components/MusicSection'

export interface HomeProps {
  readonly className?: string
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="min-h-screen bg-gray-800 relative flex flex-col lg:flex-row">
      <NextSeo
        title="SpotiFood"
        description="Suas musicas na hora da refeição"
      />
      <Menu className="lg:fixed lg:h-screen" />
      <MusicSection />
    </div>
  )
}

Home.displayName = 'Home'

export { Home }
export default Home
