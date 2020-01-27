import { GET_BEER } from './actionTypes';

export const passItem = item => {
  return {
    type: GET_BEER,
    itemObject: item
  };
};
