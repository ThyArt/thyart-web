import useAxios from 'axios-hooks';
import * as methods from 'variables/methods';

export const GetCustomers = token =>
  useAxios({
    url: 'api/customer/',
    method: methods.Get,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });

export const GetCustomer = (token, id) =>
  useAxios({
    url: 'api/customer/' + id,
    method: methods.Get,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });

const DeleteCustomerHook = token =>
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

const DeleteCustomerExecute = (func, id) =>
  func({
    url: 'api/customer/' + id
  });

export const DeleteCustomer = {
  hook: DeleteCustomerHook,
  execute: DeleteCustomerExecute
};

const CreateCustomerHook = () =>
  useAxios(
    {
      url: 'api/customer/',
      method: methods.Post
    },
    {
      manual: true
    }
  );

const CreateCustomerExecute = (
  func,
  token,
  first_name,
  last_name,
  email,
  phone,
  address,
  city,
  country
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
      country: country
    }
  });

export const CreateCustomer = {
  hook: CreateCustomerHook,
  execute: CreateCustomerExecute
};

const ModifyCustomerHook = id =>
  useAxios(
    {
      url: 'api/customer/' + id,
      method: methods.Patch
    },
    {
      manual: true
    }
  );

const ModifyCustomerExecute = (
  func,
  token,
  first_name,
  last_name,
  email,
  phone,
  address,
  city,
  country
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
      country: country
    }
  });

export const ModifyCustomer = {
  hook: ModifyCustomerHook,
  execute: ModifyCustomerExecute
};
