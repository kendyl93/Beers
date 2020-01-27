import React, { Component } from 'react';
import Layout from './../Container/Layout/Layout';
import BeerReviewer from './../Container/BeerReviewer/BeerReviewer';
import classes from './App.scss';
import WithClass from '../hoc/WithClass';

class App extends Component {

  state = {
    showModal: this.modal,
    modalContent: null,
    backdrop: false,
    props: {}
  }

  modal = (modalContent = null, props = {}) => {
    this.setState({
      modalContent,
      props
    })
  }

  render() {
    return (
      <Layout>
        <h1 className={classes["main-header"]}>
          <span className={classes.beer}>BEER</span>
          <span>GURU</span>
        </h1>
        <BeerReviewer />
      </Layout>
    );
  }
}

export default App
