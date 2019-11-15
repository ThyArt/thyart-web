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

export const UpdateNewData = () =>
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
