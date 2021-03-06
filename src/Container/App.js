import React from 'react';

import Beers from './Beers/Beers';
import './App.scss';
import ErrorBoundary from './ErrorBoundary/Error/ErrorBoundary';

const App = () => (
  <main className="app">
    <h1>
      <span className="highlighted-part">BEERS</span>
      LIST
    </h1>
    <ErrorBoundary>
      <Beers />
    </ErrorBoundary>
  </main>
);

export default App;
