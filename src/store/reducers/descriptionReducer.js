import { GET_BEER } from '../actions/actionTypes';

const initialState = {
  item: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BEER:
      return {
        item: action.itemObject
      };
    default:
      return state;
  }
};

export default reducer;
