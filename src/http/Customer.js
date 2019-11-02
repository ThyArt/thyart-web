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

const CreateCustomerHook = (
  first_name,
  last_name,
  email,
  phone,
  address,
  city,
  country
) =>
  useAxios(
    {
      url: 'api/customer/',
      method: methods.Post,
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        country: country
      } 
    },
    {
      manual: true
    }
  );

const CreateCustomerExecute = (
  func, 
  token
  ) =>
  func({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

export const CreateCustomer = {
  hook: CreateCustomerHook,
  execute: CreateCustomerExecute
};

const ModifyCustomerHook = (
  id,
  first_name,
  last_name,
  email,
  phone,
  address,
  city,
  country
) =>
  useAxios(
    {
      url: 'api/customer/' + id,
      method: methods.Patch,
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        country: country
      } 
    },
    {
      manual: true
    }
  );

const ModifyCustomerExecute = (
  func, 
  token
  ) =>
  func({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

export const ModifyCustomer = {
  hook: ModifyCustomerHook,
  execute: ModifyCustomerExecute
};