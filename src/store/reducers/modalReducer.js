import { OPEN_MODAL, CLOSE_MODAL } from '../actions/actionTypes';

const initialState = {
  isOpened: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpened: true };
    case CLOSE_MODAL:
      return { ...state, isOpened: false };
    default:
      return state;
  }
};

export default reducer;
