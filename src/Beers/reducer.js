import {
  FETCH_BEERS_PENDING,
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_ERROR
} from './types';

export const beersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BEERS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_BEERS_SUCCESS:
      return {
        ...state,
        pending: false,
        beers: action.beers
      };
    case FETCH_BEERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
};

export const getBeers = state => state.beers;
export const getBeersPending = state => state.pending;
export const getBeersError = state => state.error;
