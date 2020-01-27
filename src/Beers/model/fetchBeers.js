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

export const fetchBeers = page => {
  return async dispatch => {
    dispatch(fetchBeersPending());

    try {
      const response = await fetch(apiEndpoint(page), FETCH_OPTIONS);
      const beers = await response.json();

      dispatch(fetchBeersSuccess(beers));
      dispatch(addPage(page));
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
      const response = await fetch(apiEndpoint(page), FETCH_OPTIONS);
      const beers = await response.json();

      console.log({ MORE: beers });

      dispatch(fetchMoreBeersSuccess(beers));
      dispatch(addPage(page));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      // dispatch(fetchBeersError(error));
    }
  };
};
