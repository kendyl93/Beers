import React from 'react';

import Alien from './Alien.png';
import './ErrorView.scss';

const ErrorView = () => (
  <div className="error-view-wrapper">
    <img src={Alien} alt="Alien" />
    <h3>Something went wrong.</h3>
  </div>
);

export default ErrorView;
