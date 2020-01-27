export const getSingleBeer = id => `https://api.punkapi.com/v2/beers/${id}`;

export const getBeersPerPage = page =>
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`;

export const CONFIG = { method: 'GET' };

export const get = async endpoint => {
  const response = await fetch(endpoint, CONFIG);
  const beers = await response.json();

  return beers;
};
