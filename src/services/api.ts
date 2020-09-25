import axios from 'axios'
import cookie from 'js-cookie'

const userCookie = cookie.get('@spotifoodToken') || ''
const token = userCookie ? JSON.parse(userCookie) : undefined

export const spotifyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API,
  headers: {
    Authorization: `Bearer ${token?.access_token}`,
  },
})

export const spotifyAccount = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_ACCOUNTS,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic ' +
      new Buffer(
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
          ':' +
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
      ).toString('base64'),
  },
})
