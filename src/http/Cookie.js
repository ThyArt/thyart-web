import Cookies from 'universal-cookie';

export const generateCookie = (
  { access_token, token_type, expires_in, refresh_token },
  rememberMe = false
) => {
  const cookie = new Cookies();
  cookie.set(
    'accessToken',
    { access_token: access_token, token_type: token_type },
    { path: '/', maxAge: expires_in }
  );

  if (rememberMe) {
    cookie.set('refreshToken', refresh_token, { path: '/' });
  }
};

export const deleteCookies = async () => {
  const cookies = new Cookies();
  const cookiesName = cookies.getAll();

  Object.keys(cookiesName).forEach((cookieName) => {
    cookies.remove(cookieName);
  });
};
