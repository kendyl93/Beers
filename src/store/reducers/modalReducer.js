import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isOpened: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return { isOpened: true };
    case actionTypes.CLOSE_MODAL:
      return { isOpened: false };
    default:
      return state;
  }
};

export default reducer;
