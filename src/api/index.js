import axios from 'axios';

const ENDPOINT = 'https://api.punkapi.com/v2/beers';

export const axios_beerApi = axios.create({
  baseURL: ENDPOINT
});
