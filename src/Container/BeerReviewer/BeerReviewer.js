import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { openModal } from '../../store/actions/index';
import ModalPage from './ModalPage/ModalPage';
import List from './List/List';
import Modal from '../../Components/UI/Modal/Modal';
import { getModalOpen } from '../../store/actions/selectors';

const SINGLE_BEER_PATHNAME = '/beer/';
const ROOT_PATH = '/';

const matchSourcePathname = sourcePath =>
  Boolean(window.location.pathname.match(sourcePath));

const getSourcePathname = sourcePath =>
  window.location.pathname.match(sourcePath)[0];
class BeerReviewer extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.locationHandler();
  }

  locationHandler = () => {
    const pathnameExists = matchSourcePathname(SINGLE_BEER_PATHNAME);
    if (!pathnameExists) {
      return;
    }
    const pathname = getSourcePathname(SINGLE_BEER_PATHNAME);

    const maybeProperPathname = pathname === SINGLE_BEER_PATHNAME;
    if (!maybeProperPathname) {
      return;
    }

    const { onModalOpen } = this.props;

    onModalOpen();
  };

  render() {
    return (
      <>
        <Modal>
          <Route path={SINGLE_BEER_PATHNAME}>
            <ModalPage />
          </Route>
        </Modal>
        <Route path={ROOT_PATH}>
          <List />
        </Route>
      </>
    );
  }
}

BeerReviewer.propTypes = {
  onModalOpen: PropTypes.func
};

const mapStateToProps = ({ modalWithDetails }) => ({
  isModalOpened: getModalOpen(modalWithDetails)
});

const mapDispatchToProps = dispatch => ({
  onModalOpen: () => dispatch(openModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerReviewer);
