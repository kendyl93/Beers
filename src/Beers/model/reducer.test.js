import { getBeers, getBeersPending, getBeersError } from './selectors';
import { beersReducer } from './reducer';
import {
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_ERROR,
  FETCH_BEERS_PENDING
} from './types';

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = undefined;
    const action = {};

    expect(beersReducer(state, action)).toEqual({});
  });

  it('should handle FETCH_BEERS_SUCCESS', () => {
    const state = {};
    const successAction = {
      type: FETCH_BEERS_SUCCESS
    };

    const expected = {
      pending: false,
      beers: undefined
    };

    expect(beersReducer(state, successAction)).toEqual(expected);
  });

  it('should handle FETCH_BEERS_ERROR', () => {
    const state = {};
    const errorAction = {
      type: FETCH_BEERS_ERROR,
      error: 'ERROR'
    };

    const expected = {
      pending: false,
      error: 'ERROR'
    };

    expect(beersReducer(state, errorAction)).toEqual(expected);
  });

  it('should handle FETCH_BEERS_PENDING', () => {
    const state = {};
    const pendingAction = {
      type: FETCH_BEERS_PENDING
    };

    const expected = {
      pending: true
    };

    expect(beersReducer(state, pendingAction)).toEqual(expected);
  });
});

describe('selectors', () => {
  it('getBeers', () => {
    const state = {
      beers: { milk: 'milk', soup: 'soup' },
      pending: true,
      error: false
    };

    expect(getBeers(state)).toEqual({ milk: 'milk', soup: 'soup' });
  });

  it('getBeersPending', () => {
    const state = {
      beers: { milk: 'milk', soup: 'soup' },
      pending: true,
      error: false
    };

    expect(getBeersPending(state)).toEqual(true);
  });

  it('getBeersError', () => {
    const state = {
      beers: { milk: 'milk', soup: 'soup' },
      pending: true,
      error: false
    };

    expect(getBeersError(state)).toEqual(false);
  });
});
