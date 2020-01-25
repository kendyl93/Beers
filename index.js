import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';

import Details from './src/Beers/Components/Details';
import configureStore from './src/model/store';
import App from './src/App';
import Modal from './src/UI/Modal/Modal';

import './index.scss';

const store = configureStore();

const ModalSwitch = () => {
  const location = useLocation();
  const { background } = (location && location.state) || {};

  return (
    location && (
      <div>
        <Switch location={background || location}>
          <Route path="/">
            <App />
          </Route>
          <Route exact path="/details/:id">
            <Details />
          </Route>
        </Switch>
        <Route path="/details/:id">
          <Modal />
        </Route>
      </div>
    )
  );
};

const WithProvider = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <ModalSwitch />
      </Router>
    </Provider>
  );
};

WithProvider.propTypes = {
  store: PropTypes.object
};

const rootElement = document.getElementById('root');
ReactDOM.render(<WithProvider store={store} />, rootElement);
