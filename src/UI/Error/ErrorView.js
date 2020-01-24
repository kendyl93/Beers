import React from 'react';

import Alien from './Alien.png';

const ErrorView = () => (
  <div>
    <img src={Alien} alt="Alien" />
    <h3>Something went wrong.</h3>
  </div>
);

export default ErrorView;
