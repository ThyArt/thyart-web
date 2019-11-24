import Cookies from 'universal-cookie';
import useAxios from 'axios-hooks';
import * as methods from 'variables/methods';

const cookies = new Cookies();

export const FetchArtworks = () =>
  useAxios({
    url: 'api/artwork',
    method: methods.Get,
    headers: {
      Authorization: `Bearer ${cookies.get('accessToken').access_token}`
    }
  });

export const FetchExposedArtworks = () =>
  useAxios({
    url: 'api/artwork?state=exposed',
    method: methods.Get,
    headers: {
      Authorization: `Bearer ${cookies.get('accessToken').access_token}`
    }
  });

const GetArtworkHook = token =>
  useAxios(
    {
      method: methods.Get,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    },
    {
      manual: true
    }
  );

const GetArtworkExecute = (func, id) =>
  func({
    url: 'api/artwork/' + id
  });

export const GetArtwork = {
  hook: GetArtworkHook,
  execute: GetArtworkExecute
};
