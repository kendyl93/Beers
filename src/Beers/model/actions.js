import {
  FETCH_BEERS_PENDING,
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_ERROR
} from './actionTypes';

export const fetchBeersPending = () => ({ type: FETCH_BEERS_PENDING });

export const fetchBeersSuccess = beers => ({
  type: FETCH_BEERS_SUCCESS,
  beers
});

export const fetchBeersError = error => ({
  type: FETCH_BEERS_ERROR,
  error
});
