import {
  fetchBeersPending,
  fetchBeersSuccess,
  fetchBeersError
} from './actions';

const API_ENDPOINT = 'https://api.punkapi.com/v2/beers';
const FETCH_OPTIONS = { method: 'GET' };

const fetchBeers = () => {
  return async dispatch => {
    dispatch(fetchBeersPending());

    try {
      const response = await fetch(API_ENDPOINT, FETCH_OPTIONS);
      const beers = await response.json();

      dispatch(fetchBeersSuccess(beers));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      dispatch(fetchBeersError(error));
    }
  };
};

export default fetchBeers;
