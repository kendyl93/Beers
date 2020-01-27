import React from 'react';

import BeerReviewer from './BeerReviewer/BeerReviewer';
import './App.scss';

const App = () => (
  <div>
    <h1 className="main-header">
      <span className="beer">BEER</span>
      <span>GURU</span>
    </h1>
    <BeerReviewer />
  </div>
);

export default App;
