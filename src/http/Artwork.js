import Cookies from 'universal-cookie';
import useAxios from 'axios-hooks';
import { Client } from './Client';
import { Get } from 'variables/methods';

const cookies = new Cookies();

export const FetchArtworks = () =>
  useAxios({
    url: 'api/artwork',
    method: Get,
    headers: {
      Authorization: `Bearer ${cookies.get('accessToken').access_token}`
    }
  });

export const DeleteArtwork = artworkId =>
  Client.delete(`api/artwork/${artworkId}`, {
    headers: { Authorization: `Bearer ${cookies.get('accessToken').access_token}` }
  });
