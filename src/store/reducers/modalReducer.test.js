import reducer from './modalReducer';
import { OPEN_MODAL, CLOSE_MODAL } from '../actions/actionTypes';

const initialState = {
  isOpened: false
};

describe('reducer', () => {
  it('should return initialState', () => {
    const state = undefined;
    const action = {};

    expect(reducer(state, action)).toEqual(initialState);
  });

  it('should handle OPEN_MODAL action', () => {
    const state = initialState;
    const action = { type: OPEN_MODAL };

    const expectedState = { isOpened: true };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle CLOSE_MODAL action', () => {
    const state = initialState;
    const action = { type: CLOSE_MODAL };

    const expectedState = { isOpened: false };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
