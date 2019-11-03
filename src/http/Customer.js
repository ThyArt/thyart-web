import useAxios from 'axios-hooks';
import * as methods from 'variables/methods';


const GetCustomersHook = () =>
  useAxios(
    {
      url: 'api/customer/',
      method: methods.Get
    },
    {
      manual: true
    }
  );

const GetCustomersExecute = (func, token) =>
  func({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

export const GetCustomers = {
  hook: GetCustomersHook,
  execute: GetCustomersExecute
};


const GetCustomerHook = (id) =>
  useAxios(
    {
      url: 'api/customer/' + id,
      method: methods.Get
    },
    {
      manual: true
    }
  );

const GetCustomerExecute = (func, token) =>
  func({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

export const GetCustomer = {
  hook: GetCustomerHook,
  execute: GetCustomerExecute
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
      country: country
    }
  });

export const CreateCustomer = {
  hook: CreateCustomerHook,
  execute: CreateCustomerExecute
};

const ModifyCustomerHook = (
  id
) =>
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
      country: country
    } 
  });

export const ModifyCustomer = {
  hook: ModifyCustomerHook,
  execute: ModifyCustomerExecute
};