import Cookies from 'universal-cookie';
import useAxios from 'axios-hooks';
import { Get, Delete, Post, Patch } from 'variables/methods';
import { forEach, reduce } from 'lodash';

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

export const AddArtwork = () => {
  const [data, func] = useAxios(
    {
      url: artworkUrl,
      method: Post,
      headers: {
        Authorization: `Bearer ${cookies.get('accessToken').access_token}`,
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const execute = (data, images) => {
    let formData = new FormData();

    forEach(data, (item, key) => formData.append(key, item));
    forEach(images, item => formData.append('images[]', item));

    func({ data: formData });
  };
  return [data, execute];
};

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

export const AddMedia = () => {
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

  const execute = (id, files = []) =>
    func({
      method: Post,
      url: `${artworkUrl}/${id}/image`,
      data: reduce(
        files,
        (carry, file) => {
          carry.append('images[]', file);
          return carry;
        },
        new FormData()
      )
    });

  return [hook, execute];
};
