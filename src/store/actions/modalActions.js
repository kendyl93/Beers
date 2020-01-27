import * as actionTypes from './actionTypes';

export const openModal = () => {
  return { type: actionTypes.OPEN_MODAL };
};

export const closeModal = () => {
  return { type: actionTypes.CLOSE_MODAL };
};
