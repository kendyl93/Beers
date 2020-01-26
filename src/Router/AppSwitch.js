import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useLocation } from 'react-router-dom';

import Details from '../Beers/Components/Details';
import App from '../App';

const AppSwitch = ({ singleElementPath }) => {
  const location = useLocation();
  const rootPath = '/';

  return (
    <Switch location={location}>
      <Route path={rootPath}>
        <App />
      </Route>
      <Route exact path={singleElementPath}>
        <Details />
      </Route>
    </Switch>
  );
};

AppSwitch.propTypes = {
  singleElementPath: PropTypes.string
};

export default AppSwitch;
