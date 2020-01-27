import {
  fetchBeersPending,
  fetchBeersSuccess,
  fetchBeersError,
  fetchMoreBeersSuccess,
  fetchMoreBeersLoading
} from './actions';
import { addPage } from '../Pagination/actions';

const apiEndpoint = page =>
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`;

const FETCH_OPTIONS = { method: 'GET' };

const get = async endpoint => {
  const response = await fetch(endpoint, FETCH_OPTIONS);
  const beers = await response.json();

  return beers;
};

export const fetchBeers = (page = 1) => {
  return async dispatch => {
    dispatch(fetchBeersPending());

    try {
      const endpoint = apiEndpoint(page);
      const beers = await get(endpoint);

      dispatch(fetchBeersSuccess(beers));
      dispatch(addPage(page));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      dispatch(fetchBeersError(error));
    }
  };
};
