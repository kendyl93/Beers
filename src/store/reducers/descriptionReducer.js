import * as actionTypes from '../actions/actionTypes';

const initialState = {
  item: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PASS_ITEM:
      return {
        item: action.itemObject
      };
  }

  return state;
};

export default reducer;
