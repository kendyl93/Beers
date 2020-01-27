import {
  fetchBeersPending,
  fetchBeersSuccess,
  fetchBeersError
} from './actions';
import { addPage } from '../Pagination/actions';
import { getBeersPerPage, get } from '../../api';

export const fetchBeers = (page = 1) => {
  return async dispatch => {
    dispatch(fetchBeersPending());

    try {
      const endpoint = getBeersPerPage(page);
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
