import useAxios from 'axios-hooks';
import * as methods from 'variables/methods';

const SignInHook = () =>
  useAxios(
    {
      url: 'oauth/token',
      method: methods.Post
    },
    {
      manual: true
    }
  );

const SignInExecute = (func, email, password) =>
  func({
    data: {
      grant_type: 'password',
      client_id: process.env.REACT_APP_API_CLIENT_ID,
      client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
      username: email,
      password: password,
      scope: '*'
    }
  });

export const SignUp = () =>
  useAxios(
    {
      url: 'api/user',
      method: methods.Post
    },
    {
      manual: true
    }
  );

export const SignIn = {
  hook: SignInHook,
  execute: SignInExecute
};