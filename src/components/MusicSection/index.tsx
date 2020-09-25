import React, { useState } from 'react'
import cx from 'classnames'
import styled from 'styled-components'
import MusicCard from '../MusicCard'
import FiltersComponent from '../Filters'
import { Filters, PlaylistsData } from '~/types'
import usePlaylist from '~/hooks/usePlaylist'
import { AiOutlineLoading } from 'react-icons/ai'

const DivWithGradient = styled.div`
  background: linear-gradient(130deg, #392b65 11.18%, #2d3748 42.52%);
  @media (min-width: 1024px) {
    margin-left: 20%;
  }
`

export interface MusicSectionProps {
  readonly className?: string
}

const MusicSection: React.FC<MusicSectionProps> = ({ className }) => {
  const [filters, setFilters] = useState<Filters>({})
  const [ data ] = usePlaylist(filters)
  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  const spotifyData: PlaylistsData | null = data ? data : null

  return (
    <DivWithGradient
      className={cx(
        'min-h-screen w-full lg:w-4/5 px-4 lg:px-10 pt-8',
        className
      )}
    >
      <FiltersComponent value={filters} onChange={handleFiltersChange} className="mb-4" />
      {spotifyData && spotifyData.playlists ? (
        <div>
          <h1 className="text-gray-300 text-xl font-medium mb-4">
            Featured playlists{' '}
            {spotifyData.message && `- ${spotifyData.message}`}
          </h1>
          <div className="flex -mx-2 flex-wrap">
            {spotifyData.playlists.items.map((playlist) => (
              <MusicCard
                key={playlist.id}
                playlist={playlist}
                className="mb-5"
              />
            ))}
          </div>
        </div>
      ) : !spotifyData ? (
        <div>
          <AiOutlineLoading className="animate-spin text-white" size={25} />
        </div>
      ) : (
        <h1 className="text-white">We didn't find playlists :(</h1>
      )}
    </DivWithGradient>
  )
}

MusicSection.displayName = 'MusicSection'

export { MusicSection }
export default MusicSection
