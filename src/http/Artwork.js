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
