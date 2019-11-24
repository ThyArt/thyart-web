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
      subject: "This is a test",
      description: "Also a test",
      customer_list: []
    }
  });

export const CreateNewsletter = {
  hook: CreateNewsletterHook,
  execute: CreateNewsletterExecute
};
