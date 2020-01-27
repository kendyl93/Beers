import { GET_BEER } from './actionTypes';

export const getBeer = beer => ({
  type: GET_BEER,
  beer
});
