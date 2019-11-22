import useAxios from 'axios-hooks';
import * as methods from 'variables/methods';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const GetCurrentData = () =>
  useAxios({
    url: 'api/user/self',
    method: methods.Get,
    headers: {
      Authorization: `Bearer ${cookie.get('accessToken').access_token}`
    }
  });

const UpdateNewDataHook = () =>
  useAxios(
    {
      url: 'api/user',
      method: methods.Patch,
      headers: {
        Authorization: `Bearer ${cookie.get('accessToken').access_token}`
      }
    },
    {
      manual: true
    }
  );
const UpdateNewDataExecute = (func, firstname, lastname, email, password) =>
{
  if (password) {
    return (
      func({
        url: 'api/user',
        data: {
          firstname,
          lastname,
          email,
          password
        }
      })
    );
  } else {
    return (
      func({
        url: 'api/user',
        data: {
          firstname,
          lastname,
          email
        }
      })
    );
  }
};

export const UpdateNewData = {
  hook: UpdateNewDataHook,
  execute: UpdateNewDataExecute
};