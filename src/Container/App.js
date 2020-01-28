import React from 'react';

import Beers from './Beers/Beers';
import './App.scss';

const App = () => (
  <main className="app">
    <h1>
      <span className="highlighted-part">BEER</span>
      GURU
    </h1>
    <Beers />
  </main>
);

export default App;
