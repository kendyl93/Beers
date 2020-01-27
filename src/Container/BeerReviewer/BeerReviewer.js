import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionsCreator from '../../store/actions/index';
import Page from './Page/Page';
import List from './List/List';
import Modal from '../../Components/UI/Modal/Modal';

class BeerReviewer extends Component {
  state = {
    isFirstLoad: true
  };

  locationHandler = () => {
    // it checks if the very first time of page loading and is it not the source location
    const isPathname = Boolean(window.location.pathname.match(/\/beer\/:/i));
    this.setState({ isFirstLoad: false });
    if (this.state.isFirstLoad & isPathname) {
      // if we try to get 'beer' path the app opens the modal window with specified beer page component
      const pathname = window.location.pathname.match(/\/beer\/:/i)[0];
      if (pathname === '/beer/:') {
        this.props.onModalOpen();
      }
    }
  };

  componentWillMount() {
    this.locationHandler();
  }

  render() {
    return (
      <>
        <Modal>
          <Route path="/beer/" render={props => <Page />} />
        </Modal>
        <Route path="/" render={props => <List />} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isModalOpened: state.modalDscrp.isOpened
  };
};

const mapDispatchToProps = dispatch => {
  return { onModalOpen: () => dispatch(actionsCreator.openModal()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(BeerReviewer);
