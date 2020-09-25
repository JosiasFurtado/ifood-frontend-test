import { send } from 'micro'
import microAuthSpotify from 'microauth-spotify'

const VERCEL_URL = process.env.VERCEL_URL

if (!VERCEL_URL) {
  throw new Error('You must define VERCEL_URL env at vercel.com dashboard')
}

const options = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackUrl: VERCEL_URL + '/api/spotify/auth/callback',
  path: '/api/spotify/auth/start',
  scope: '',
}

const withSpotifyAuth = microAuthSpotify(options)

module.exports = withSpotifyAuth(async (_, res, auth) => {
  if (!auth) {
    return send(res, 404, 'Not Found')
  }

  if (auth.err) {
    // Error handler
    return send(res, 403, 'Forbidden')
  }

  return `Hello ${auth.result.info.id}`
})
