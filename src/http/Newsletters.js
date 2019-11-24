import useAxios from 'axios-hooks';
import * as methods from 'variables/methods';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const GetAllNewsletters = () =>
  useAxios({
    url: 'api/newsletter',
    method: methods.Get,
    headers: {
      Authorization: `Bearer ${cookie.get('accessToken').access_token}`
    }
  });

export const GetANewsletters = (id) =>
  useAxios({
    url: 'api/newsletter/' + id,
    method: methods.Get,
    headers: {
      Authorization: `Bearer ${cookie.get('accessToken').access_token}`
    }
  });

const CreateNewsletterHook = () =>
  useAxios(
    {
      url: 'api/newsletter',
      method: methods.Post,
      headers: { Authorization: `Bearer ${cookie.get('accessToken').access_token}` }
    },
    { manual: true }
  );

const CreateNewsletterExecute = (func) =>
  func({
    data: {
      subject: "BONJOUR",
      description: "new test",
      customer_list: "35"
    }
  });

export const CreateNewsletter = {
  hook: CreateNewsletterHook,
  execute: CreateNewsletterExecute
};

const DeleteNewsletterHook = () =>
  useAxios(
    {
      url: 'api/newsletter',
      method: methods.Delete,
      headers: { Authorization: `Bearer ${cookie.get('accessToken').access_token}` }
    },
    { manual: true }
  );

const DeleteNewsletterExecute = (func, id) =>
  func({ url: 'api/newsletter/' + id });

export const DeleteNewsletter = {
  hook: DeleteNewsletterHook,
  execute: DeleteNewsletterExecute
};
