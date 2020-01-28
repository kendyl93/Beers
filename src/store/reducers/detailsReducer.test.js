import reducer from './detailsReducer';
import { GET_BEER } from '../actions/actionTypes';

const initialState = { beer: {} };

describe('reducer', () => {
  it('should return initialState', () => {
    const state = undefined;
    const action = {};

    expect(reducer(state, action)).toEqual(initialState);
  });

  it('should handle GET_BEER action', () => {
    const state = initialState;
    const action = { type: GET_BEER, beer: { id: 1 } };

    const expectedState = { beer: { id: 1 } };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
