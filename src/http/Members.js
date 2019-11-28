import useAxios from 'axios-hooks';
import * as methods from 'variables/methods';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const GetCurrentMembers = () =>
  useAxios({
    url: 'api/user/',
    method: methods.Get,
    headers: {
      Authorization: `Bearer ${cookie.get('accessToken').access_token}`
    }
  });

const UpdateRoleHook = () =>
  useAxios(
    {
      url: 'api/user/role/',
      method: methods.Post,
      headers: {
        Authorization: `Bearer ${cookie.get('accessToken').access_token}`
      }
    },
    {
      manual: true
    }
  );

const UpdateRoleExecute = (func, id, role) =>
  func({
    url: 'api/user/role/' + id,
    data: {
      role: role
    }
  });

export const UpdateRole = {
  hook: UpdateRoleHook,
  execute: UpdateRoleExecute
};

const CreateMemberHook = () =>
  useAxios(
    {
      url: 'api/user/member',
      method: methods.Post,
      headers: {
        Authorization: `Bearer ${cookie.get('accessToken').access_token}`
      }
    },
    {
      manual: true
    }
  );

const CreateMemberExecute = (func, email, firstname, lastname, password, name) =>
  func({
    data: {
      firstname,
      lastname,
      name,
      email,
      password
    }
  });

export const CreateMember = {
  hook: CreateMemberHook,
  execute: CreateMemberExecute
};
