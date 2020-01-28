export const BASE_ENDPOINT = 'https://api.punkapi.com/v2/beers';

export const singleBeerEndpoint = id => `/beer/${id}`;

export const fethByBaseEndpoint = endpoint =>
  fetch(`${BASE_ENDPOINT}${endpoint}`);

export const query = (page, beersPerPage) =>
  `?page=${page}&beersPerPage=${beersPerPage}`;

export const randomQuery = '/random';

const featureQuery = ([feature, value]) => `${feature}_lt=${value}`;

export const getSimilarBeersQuery = features => {
  const featuresValues = Object.values(features);
  const atLeastOneEmpty = featuresValues.filter(Boolean) !== 3;

  if (atLeastOneEmpty) {
    return randomQuery;
  }

  const similarQuerySplitted = Object.entries(features).map(featureQuery);
  const queryBody = similarQuerySplitted.join('&');
  const fullQuery = `?${queryBody}}&per_page=1`;

  return fullQuery;
};
