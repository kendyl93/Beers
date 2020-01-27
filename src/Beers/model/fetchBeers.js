import {
  fetchBeersPending,
  fetchBeersSuccess,
  fetchBeersError,
  fetchMoreBeersSuccess,
  fetchMoreBeersLoading
} from './actions';
import { addPage } from '../Pagination/actions';

const FIRST_PAGE = 1;

const apiEndpoint = page =>
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`;

const FETCH_OPTIONS = { method: 'GET' };

const get = async endpoint => {
  const response = await fetch(endpoint, FETCH_OPTIONS);

  return await response.json();
};

export const fetchBeers = () => {
  return async dispatch => {
    dispatch(fetchBeersPending());

    try {
      const endpoint = apiEndpoint(FIRST_PAGE);
      const beers = await get(endpoint);

      dispatch(fetchBeersSuccess(beers));
      dispatch(addPage(FIRST_PAGE));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      dispatch(fetchBeersError(error));
    }
  };
};

export const loadMoreBeers = page => {
  return async dispatch => {
    dispatch(fetchMoreBeersLoading());

    try {
      const endpoint = apiEndpoint(page);
      const beers = await get(endpoint);

      dispatch(fetchMoreBeersSuccess(beers));
      dispatch(addPage(page));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      // dispatch(fetchBeersError(error));
    }
  };
};
