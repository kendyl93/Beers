import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import App from './src/Container/App';

import './index.scss';

import detailsReducer from './src/store/reducers/detailsReducer';
import modalReducer from './src/store/reducers/modalReducer';

const rootReducer = combineReducers({
  beerDetails: detailsReducer,
  modalWithDetails: modalReducer
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
