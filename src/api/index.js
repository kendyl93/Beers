export const BASE_ENDPOINT = 'https://api.punkapi.com/v2/beers';

export const singleBeerEndpoint = id => `/beer/${id}`;

export const fethByBaseEndpoint = endpoint =>
  fetch(`${BASE_ENDPOINT}${endpoint}`);

export const query = (page, beersPerPage) =>
  `?page=${page}&beersPerPage=${beersPerPage}`;

export const randomQuery = '/random';

const RANGE = 4;

const featureQuery = ([feature, value]) => {
  const gtRangeValue = value > 2 ? value - RANGE / 2 : 1;
  const ltRangeValue = value + RANGE / 2;

  return `${feature}_lt=${ltRangeValue}&${feature}_gt=${gtRangeValue}`;
};

export const getSimilarBeersQuery = (features = {}) => {
  const featuresValues = Object.values(features);
  const atLeastOneEmpty = featuresValues.filter(Boolean).length !== 3;
  if (atLeastOneEmpty) {
    return randomQuery;
  }

  const similarQuerySplitted = Object.entries(features).map(featureQuery);
  const queryBody = similarQuerySplitted.join('&');
  const fullQuery = `?${queryBody}&per_page=1`;

  return fullQuery;
};
