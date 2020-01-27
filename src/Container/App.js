import React, { Component } from 'react';

import Layout from './Layout/Layout';
import BeerReviewer from './BeerReviewer/BeerReviewer';
import './App.scss';

class App extends Component {
  state = {
    showModal: this.modal,
    modalContent: null,
    backdrop: false,
    props: {}
  };

  modal = (modalContent = null, props = {}) => {
    this.setState({
      modalContent,
      props
    });
  };

  render() {
    return (
      <Layout>
        <h1 className="main-header">
          <span className="beer">BEER</span>
          <span>GURU</span>
        </h1>
        <BeerReviewer />
      </Layout>
    );
  }
}

export default App;
