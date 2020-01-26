import { ADD } from './actionTypes';

export const paginationReducer = (state = { page: 0 }, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        page: state.page + 1
      };
    default:
      return state;
  }
};
