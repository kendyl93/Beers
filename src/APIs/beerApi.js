import axios from 'axios';

const axios_beerApi = axios.create({
  baseURL: 'https://api.punkapi.com/v2/beers'
});

export default axios_beerApi;
