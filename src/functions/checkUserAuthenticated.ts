import { parseCookies } from 'nookies'

export const checkUserAuthenticated = () => {
  const { 'auth.token': accessToken } = parseCookies()

  return !!accessToken
}
