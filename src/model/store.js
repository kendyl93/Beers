import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducer';

const initialState = { beers: [] };

const configureStore = () =>
  createStore(rootReducer, initialState, applyMiddleware(logger, thunk));

export default configureStore;
