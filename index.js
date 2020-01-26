import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './src/model/store';
import WithModal from './src/Router/Routes';

import './index.scss';

const store = configureStore();

const WithProvider = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <WithModal />
      </Router>
    </Provider>
  );
};

WithProvider.propTypes = {
  store: PropTypes.object
};

const rootElement = document.getElementById('root');
ReactDOM.render(<WithProvider store={store} />, rootElement);
