export const checkUserAuthenticated = () => {
  const token = sessionStorage.getItem('accessToken')
  const accessToken = token

  return !!accessToken
}
