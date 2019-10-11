import { configure } from 'axios-hooks';
import Axios from 'axios';
import LRU from 'lru-cache';

const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  responseType: 'json',
  headers: {
    Accept: 'applicartion/json',
    'Content-type': 'application/json'
  }
});

const cache = new LRU({ max: parseInt(process.env.REACT_APP_LRU_CACHE_SIZE) });

export const Client = axios;
export const Cache = cache;
export const Configure = () => configure({ axios, cache });
