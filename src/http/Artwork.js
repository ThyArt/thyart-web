import Cookies from 'universal-cookie';
import useAxios from 'axios-hooks';
import { Client } from './Client';
import { Get, Delete } from 'variables/methods';

const cookies = new Cookies();

const artworkUrl = 'api/artwork';
export const FetchArtworks = () =>
  useAxios({
    url: artworkUrl,
    method: Get,
    headers: {
      Authorization: `Bearer ${cookies.get('accessToken').access_token}`
    }
  });

export const DeleteArtwork = () => {
  const [hook, func] = useAxios(
    {
      url: artworkUrl,
      method: Delete,
      headers: { Authorization: `Bearer ${cookies.get('accessToken').access_token}` }
    },
    { manual: true }
  );

  const execute = id =>
    func({
      url: `${artworkUrl}/${id}`
    });

  return [hook, execute];
};
