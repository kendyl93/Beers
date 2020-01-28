import React from 'react';

import BeerReviewer from './BeerReviewer/BeerReviewer';
import './App.scss';

const App = () => (
  <main className="app">
    <h1>
      <span className="highlighted-part">BEER</span>
      GURU
    </h1>
    <BeerReviewer />
  </main>
);

export default App;
