import axios from 'axios';

const apiURL = 'http://thyart-api-dev.eu-west-1.elasticbeanstalk.com/';
const pingURL = 'api/ping';
const userURL = 'api/user';
const tokenURL = 'oauth/token';

const header = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
};
const clientID = 1;
const clientSecret = 'fbpB6Lmd3lcDDFKZF5VwJib2jjphjweU67YiA2NE';

export const pingAPI = () => axios.get(apiURL + pingURL, header);

export const registerAPI = param => axios.post(apiURL + userURL, param, header);

export const loginAPI = param => {
  const body = {
    grant_type: 'password',
    client_id: clientID,
    client_secret: clientSecret,
    username: param['user'],
    password: param['passwd'],
    scope: '*'
  };
  return axios.post(apiURL + tokenURL, body, header);
};
