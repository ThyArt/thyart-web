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
const UpdateNewDataExecute = (func, firstname, lastname, email, password) => {
  let to_send = {};
  let tmp = { firstname, lastname, email, password };
  Object.keys(tmp).forEach(key => {
    if (tmp[key]) {
      to_send[key] = tmp[key];
    }
  });
  return func({
    url: 'api/user',
    data: to_send
  });
};

export const UpdateNewData = {
  hook: UpdateNewDataHook,
  execute: UpdateNewDataExecute
};
