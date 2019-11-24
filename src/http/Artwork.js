import Cookies from 'universal-cookie';
import useAxios from 'axios-hooks';
import { Get, Delete, Post, Patch } from 'variables/methods';

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

export const AddArtwork = () =>
  useAxios(
    {
      url: artworkUrl,
      method: Post,
      headers: { Authorization: `Bearer ${cookies.get('accessToken').access_token}` }
    },
    { manual: true }
  );

export const PatchArtwork = () => {
  const [hook, func] = useAxios(
    {
      url: artworkUrl,
      method: Patch,
      headers: {
        Authorization: `Bearer ${cookies.get('accessToken').access_token}`
      }
    },
    { manual: true }
  );

  const execute = (id, data) =>
    func({
      url: `${artworkUrl}/${id}`,
      data: data
    });

  return [hook, execute];
};
