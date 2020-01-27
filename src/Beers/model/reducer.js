import {
  FETCH_BEERS_PENDING,
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_ERROR,
  FETCH_MORE_BEERS_SUCCESS,
  FETCH_MORE_BEERS_LOADING
} from './types';
import { mergeBeers } from '../../helpers';

const initialState = {
  beers: [],
  moreBeers: [],
  pending: false,
  loading: false,
  error: ''
};

export const beersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BEERS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_MORE_BEERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_BEERS_SUCCESS:
      return {
        ...state,
        pending: false,
        beers: mergeBeers(state)(action)
      };
    case FETCH_MORE_BEERS_SUCCESS:
      return {
        ...state,
        loading: false,
        moreBeers: action.moreBeers
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
