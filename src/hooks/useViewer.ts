import { useMemo } from 'react'
import cookie from 'js-cookie'
import { User, ViewerToken } from '~/types'

interface UseViewerResult {
  viewer: User | null
  token: ViewerToken | null
}

const useViewer = () => {
  const userCookie = cookie.get('@spotifoodUser') || undefined
  const viewer: User = userCookie ? JSON.parse(userCookie) : undefined

  const tokenCookie = cookie.get('@spotifoodToken') || undefined
  const token: ViewerToken = userCookie ? JSON.parse(tokenCookie) : undefined

  const result: UseViewerResult = useMemo(() => ({ viewer, token }), [
    viewer,
    token,
  ])
  return result
}

export default useViewer
