import {
  fetchBeersPending,
  fetchBeersSuccess,
  fetchBeersError
} from './actions';
import { addPage } from '../Pagination/actions';

const apiEndpoint = page =>
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`;

const FETCH_OPTIONS = { method: 'GET' };

const fetchBeers = page => {
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

export default fetchBeers;
