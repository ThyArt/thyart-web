import useAxios from 'axios-hooks';
import Cookies from 'universal-cookie';
import * as methods from 'variables/methods';

const cookies = new Cookies();

export const GetBillings = token =>
  useAxios({
    url: 'api/order/',
    method: methods.Get,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });

export const GetBilling = (token, id) =>
  useAxios({
    url: 'api/order/' + id,
    method: methods.Get,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });

const DeleteBillingHook = token =>
  useAxios(
    {
      method: methods.Delete,
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

const DeleteBillingExecute = (func, id) =>
  func({
    url: 'api/order/' + id
  });

export const DeleteBillings = {
  hook: DeleteBillingHook,
  execute: DeleteBillingExecute
};

const CreateBillingHook = () =>
  useAxios(
    {
      url: 'api/order/',
      method: methods.Post
    },
    {
      manual: true
    }
  );

const CreateBillingExecute = (
  func,
  token,
  first_name,
  last_name,
  email,
  phone,
  address,
  city,
  country,
  date,
  artworkId
) =>
  func({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      address: address,
      city: city,
      country: country,
      date: date,
      artwork_id: artworkId
    }
  });

export const CreateBilling = {
  hook: CreateBillingHook,
  execute: CreateBillingExecute
};

const ModifyBillingHook = id =>
  useAxios(
    {
      url: 'api/order/' + id,
      method: methods.Patch
    },
    {
      manual: true
    }
  );

const ModifyBillingExecute = (
  func,
  token,
  first_name,
  last_name,
  email,
  phone,
  address,
  city,
  country,
  artworkId
) =>
  func({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      address: address,
      city: city,
      country: country,
      artwork_id: artworkId
    }
  });

export const ModifyBilling = {
  hook: ModifyBillingHook,
  execute: ModifyBillingExecute
};

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
