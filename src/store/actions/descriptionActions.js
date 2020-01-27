import * as actionTypes from './actionTypes';

export const passItem = item => {
  return {
    type: actionTypes.PASS_ITEM,
    itemObject: item
  };
};
