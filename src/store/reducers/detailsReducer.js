import { GET_BEER } from '../actions/actionTypes';

const initialState = {
  beer: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BEER:
      return {
        beer: action.beer
      };
    default:
      return state;
  }
};

export default reducer;
