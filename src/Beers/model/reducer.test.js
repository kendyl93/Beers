import { getBeers, getBeersPending, getBeersError } from './selectors';
import { beersReducer } from './reducer';
import {
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_ERROR,
  FETCH_BEERS_PENDING
} from './actionTypes';

const initialState = { beers: [], error: '', pending: false };

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = undefined;
    const action = {};

    expect(beersReducer(state, action)).toEqual(initialState);
  });

  it('should handle FETCH_BEERS_SUCCESS', () => {
    const successAction = {
      type: FETCH_BEERS_SUCCESS,
      beers: []
    };
    expect(beersReducer(initialState, successAction)).toEqual(initialState);
  });

  it('should handle FETCH_BEERS_ERROR', () => {
    const errorAction = {
      type: FETCH_BEERS_ERROR,
      error: 'ERROR'
    };

    const expected = {
      beers: [],
      error: 'ERROR',
      pending: false
    };

    expect(beersReducer(initialState, errorAction)).toEqual(expected);
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
      error: 'ERROR'
    };

    expect(getBeers(state)).toEqual({ milk: 'milk', soup: 'soup' });
  });

  it('getBeersPending', () => {
    const state = {
      beers: { milk: 'milk', soup: 'soup' },
      pending: true,
      error: 'ERROR'
    };

    expect(getBeersPending(state)).toEqual(true);
  });

  it('getBeersError', () => {
    const state = {
      beers: { milk: 'milk', soup: 'soup' },
      pending: true,
      error: 'ERROR'
    };

    expect(getBeersError(state)).toEqual('ERROR');
  });
});
