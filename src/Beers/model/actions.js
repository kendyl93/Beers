import {
  FETCH_BEERS_PENDING,
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_ERROR,
  FETCH_MORE_BEERS_SUCCESS,
  FETCH_MORE_BEERS_LOADING
} from './types';

export const fetchBeersPending = () => ({ type: FETCH_BEERS_PENDING });

export const fetchMoreBeersLoading = () => ({ type: FETCH_MORE_BEERS_LOADING });

export const fetchBeersSuccess = beers => ({
  type: FETCH_BEERS_SUCCESS,
  beers
});

export const fetchMoreBeersSuccess = moreBeers => ({
  type: FETCH_MORE_BEERS_SUCCESS,
  moreBeers
});

export const fetchBeersError = error => ({
  type: FETCH_BEERS_ERROR,
  error
});
