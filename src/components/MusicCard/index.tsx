import React from 'react'
import cx from 'classnames'
import { Playlist } from '~/types'
import { FaPlayCircle } from 'react-icons/fa'

export interface MusicCardProps {
  readonly className?: string
  readonly playlist: Playlist
}

const MusicCard: React.FC<MusicCardProps> = ({ className, playlist }) => {
  return (
    <div className={cx('w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2', className)}>
      <div className="relative mb-1">
        <a
          href={playlist.external_urls.spotify}
          className="absolute text-5xl text-gray-100 p-2 right-0 transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <FaPlayCircle />
        </a>
        <img
          className="rounded-lg w-full h-40 sm:h-48 md:h-56 lg:h-64"
          src={playlist.images[0].url}
        />
      </div>
      <h5 className="text-white text-lg font-medium truncate">
        {playlist.name}
      </h5>
      <h6 className="text-gray-500 text-base truncate">
        {playlist.description}
      </h6>
    </div>
  )
}

MusicCard.displayName = 'MusicCard'

export { MusicCard }
export default MusicCard
