import React from 'react';

import Layout from './Layout/Layout';
import BeerReviewer from './BeerReviewer/BeerReviewer';
import './App.scss';

const App = () => (
  <Layout>
    <h1 className="main-header">
      <span className="beer">BEER</span>
      <span>GURU</span>
    </h1>
    <BeerReviewer />
  </Layout>
);

export default App;
