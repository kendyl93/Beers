import React from 'react';

import RollingSpinner from './RollingSpinner';

import './Spinner.scss';

const WIDTH = 70;
const HEIGHT = 70;

const Spinner = () => (
  <div className="spinner-wrapper">
    <RollingSpinner width={WIDTH} height={HEIGHT} />
  </div>
);

export default Spinner;
