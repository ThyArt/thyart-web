import useAxios from 'axios-hooks';
import * as methods from 'variables/methods';

export const GetBillings = (token) =>
  useAxios(
    {
      url: 'api/order/',
      method: methods.Get,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }
  );

export const GetBilling = (token, id) =>
  useAxios(
    {
      url: 'api/order/' + id,
      method: methods.Get,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }
  )

const DeleteBillingHook = (token) =>
  useAxios(
    {
      method: methods.Delete,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    },
    {
      manual: true
    }
  );

const DeleteBillingExecute = (func, id) =>
    func({
      url: 'api/order/' + id,
    })

export const DeleteBilling = {
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
  artworkId
  ) =>
  func({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
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
      price: price,
      artworkId: artworkId
    }
  });

export const CreateBilling = {
  hook: CreateBillingHook,
  execute: CreateBillingExecute
};

const ModifyBillingHook = (
  id
) =>
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
  date,
  price,
  artworkId
  ) =>
  func({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
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
      price: price,
      artworkId: artworkId
    } 
  });

export const ModifyBilling = {
  hook: ModifyBillingHook,
  execute: ModifyBillingExecute
};