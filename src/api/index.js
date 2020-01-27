import axios from 'axios';

export const ENDPOINT = 'https://api.punkapi.com/v2/beers';

export const axiosBeerApi = axios.create({
  baseURL: ENDPOINT
});
