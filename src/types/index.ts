export type FilterValues = { value: string; name: string }

export type FilterValidation = {
  primitiveType: 'INTEGER' | 'STRING'
  min?: number
  max?: number
  pattern?: 'yyyy-MM-ddTHH:mm:ss'
}

export interface Filter {
  id: Filters
  name: string
  values?: FilterValues[]
  validation?: FilterValidation
}

export interface User {
  id: string
  country: string
  display_name: string
  email: string
}

export interface ViewerToken {
  access_token: string
  expires_in: number
}

export interface PlaylistImage {
  url: string
}

export interface Playlist {
  description: string
  href: string
  id: string
  name: string
  type: string
  images: PlaylistImage[]
  tracks: {
    href: string
    total: number
  }
  external_urls: {
    spotify: string
  }
}

export interface PlaylistsData {
  message: string
  playlists: {
    href: string
    limit: number
    total: number
    next: string | null
    previous: string | null
    items: Playlist[]
  }
}

export interface Filters {
  locale?: string
  country?: string
  limit?: number
  offset?: number
  timestamp?: string
  query?: string
}
