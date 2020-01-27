import { ADD_PAGE } from './actionTypes';

const initialState = { page: 1 };

export const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PAGE:
      return {
        ...state,
        page: action.page + 1
      };
    default:
      return state;
  }
};
