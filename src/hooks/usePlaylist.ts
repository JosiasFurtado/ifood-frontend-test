import { useMemo, useState, useEffect } from 'react'
import useViewer from './useViewer'
import useSWR from 'swr'
import { PlaylistsData } from '~/types'
import { Filters } from '~/types'

type UsePlaylistResult = [data: PlaylistsData | null, filters: Filters]

const usePlaylist = (filters: Filters) => {
  const { token } = useViewer()
  const [data, setData] = useState<PlaylistsData | null>(null)

  const url = useMemo(() => {
    const { country, limit, timestamp, locale, offset, query } = filters
    const countryParams = `&country=${country ? country : 'BR'}`
    const dateParams = `?timestamp=${
      timestamp ? timestamp : '2020-24-09'
    }T00%3A06%3A19`
    const offsetParams = `&offset=${offset ? offset : 0}`
    const limitParams = `&limit=${limit ? limit : 20}`
    const localeParams = `&locale=${locale ? locale : 'pt_BR'}`

    const queryParams = `${dateParams}${offsetParams}${limitParams}${countryParams}${localeParams}`
    if (filters.query) {
      return `${process.env.NEXT_PUBLIC_SPOTIFY_API}/search${queryParams}&q=name:${query}&type=playlist`
    }
    return `${process.env.NEXT_PUBLIC_SPOTIFY_API}/browse/featured-playlists${queryParams}`
  }, [filters])

  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    }).then((r) => r.json())

  const { data: spotifyData } = useSWR(url, fetcher, {
    refreshInterval: 30000,
  })

  useEffect(() => {
    setData(spotifyData)
  }, [url, spotifyData])

  const result: UsePlaylistResult = useMemo(() => [data, filters], [
    data,
    filters,
  ])
  return result
}

export default usePlaylist
