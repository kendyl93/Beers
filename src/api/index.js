export const BASE_ENDPOINT = 'https://api.punkapi.com/v2/beers';

export const singleBeerEndpoint = id => `/beer/${id}`;

export const fethByBaseEndpoint = endpoint =>
  fetch(`${BASE_ENDPOINT}${endpoint}`);
