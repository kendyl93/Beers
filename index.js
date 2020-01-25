import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Details from './src/Beers/Components/Details';
import configureStore from './src/model/store';
import App from './src/App';

import './index.scss';

const store = configureStore();

const WithProvider = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Route exact patch="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

WithProvider.propTypes = {
  store: PropTypes.object
};

const rootElement = document.getElementById('root');
ReactDOM.render(<WithProvider store={store} />, rootElement);
