export const checkUserAuthenticated = () => {
  const token = window.sessionStorage.getItem("accessToken");
  const accessToken = token;

  return !!accessToken;
};
