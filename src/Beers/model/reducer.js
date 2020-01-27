import {
  FETCH_BEERS_PENDING,
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_ERROR
} from './actionTypes';
import { mergeBeers } from '../../helpers';

const initialState = {
  beers: [],
  pending: false,
  error: ''
};

export const beersReducer = (state = initialState, action) => {
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
        beers: mergeBeers(state)(action)
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
