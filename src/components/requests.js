import axios from 'axios';

const apiURL = 'http://thyart-api-dev.eu-west-1.elasticbeanstalk.com/api/';
const pingURL = 'ping';
const userURL = 'user';

const header = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } };

export const pingAPI = () => axios.get(apiURL + pingURL, header);
export const registerAPI = param => axios.post(apiURL + userURL, param, header);
