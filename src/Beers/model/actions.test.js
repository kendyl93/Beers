import {
  fetchBeersPending,
  fetchBeersError,
  fetchBeersSuccess
} from './actions';
import {
  FETCH_BEERS_PENDING,
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_ERROR
} from './types';

describe('Beers actions', () => {
  it('FETCH_BEERS_PENDING', () => {
    const pendingAction = {
      type: FETCH_BEERS_PENDING
    };

    expect(fetchBeersPending()).toEqual(pendingAction);
  });

  it('FETCH_BEERS_ERROR', () => {
    const errorAction = {
      type: FETCH_BEERS_ERROR,
      error: true
    };

    expect(fetchBeersError(true)).toEqual(errorAction);
  });

  it('FETCH_BEERS_SUCCESS', () => {
    const defaultBeers = { bread: 'bread', egg: 'egg' };
    const errorAction = {
      type: FETCH_BEERS_SUCCESS,
      beers: defaultBeers
    };

    expect(fetchBeersSuccess(defaultBeers)).toEqual(errorAction);
  });
});
