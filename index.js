import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import configureStore from './src/model/store';
import App from './src/App';

const store = configureStore();

const WithProvider = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

WithProvider.propTypes = {
  store: PropTypes.object
};

const rootElement = document.getElementById('root');
ReactDOM.render(<WithProvider store={store} />, rootElement);
