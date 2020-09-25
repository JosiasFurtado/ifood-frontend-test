import React, { useEffect } from 'react'
import PrimaryButton from '~/components/PrimaryButton'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { spotifyAccount, spotifyApi } from '../services/api'
import cookie from 'js-cookie'
import useViewer from '~/hooks/useViewer'

export interface LoginProps {
  readonly className?: string
}

const Login: React.FC<LoginProps> = () => {
  const { push, query } = useRouter()
  const { viewer } = useViewer()

  useEffect(() => {
    const code = query?.code
    const error = query?.error

    if (code) {
      const getTokenAndUserInfo = async () => {
        const appUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL

        if (!appUrl) return console.error('app url not defined')
        const params = new URLSearchParams()
        params.append('grant_type', 'authorization_code')
        params.append('redirect_uri', appUrl)
        params.append('code', String(code))

        const token = await spotifyAccount.post('/api/token', params.toString())
        cookie.set('@spotifoodToken', token.data)

        const { access_token } = token.data
        const user = await spotifyApi.get('/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        cookie.set('@spotifoodUser', user.data)

        window.location.assign(appUrl)
      }
      getTokenAndUserInfo()
    }

    if (viewer) {
      push('/home')
    }

    if (error) {
      throw new Error(String(error))
    }
  }, [query, viewer])

  const handleLogin = () => {
    if (
      !process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ||
      !process.env.NEXT_PUBLIC_APP_URL
    ) {
      return console.error('client id or app url not defined')
    }
    const params = new URLSearchParams()
    params.append('client_id', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID)
    params.append('response_type', 'code')
    params.append(
      'redirect_uri',
      process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL
    )
    params.append('scope', 'user-read-private user-read-email')

    const url = `https://accounts.spotify.com/authorize?${params.toString()}`
    window.location.assign(url)
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative">
      <NextSeo
        title="SpotiFood"
        description="Suas musicas na hora da refeição"
      />
      <div className="flex flex-col justify-center items-center">
        <img src="/static/logo.svg" className="mb-2" />
        <h1 className="text-white text-3xl mb-6">SpotiFood</h1>
        <PrimaryButton onClick={handleLogin}>
          Sign in with Spotify
        </PrimaryButton>
      </div>
      <a
        href="https://github.com/JosiasFurtado"
        target="__blank"
        className="absolute bottom-0 right-0 py-4 px-6 text-gray-700"
      >
        Github - Josias Furtado
      </a>
    </div>
  )
}

Login.displayName = 'Login'

export { Login }
export default Login
