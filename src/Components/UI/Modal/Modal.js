import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';
import CloseButton from './CloseButton/CloseButton';
import { openModal, closeModal } from '../../../store/actions/index';
import { getModalOpen } from '../../../store/actions/selectors';

import './Modal.scss';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { isOpened: sourceIsOpened, children: sourceChildren } = this.props;
    const { isOpened, children } = nextProps;

    return isOpened !== sourceIsOpened || children !== sourceChildren;
  }

  render() {
    const { isOpened, children } = this.props;

    if (isOpened) {
      return (
        <div className="Modal-container">
          <Backdrop />
          <div
            className={isOpened ? 'Modal' : null}
            styles={{
              transform: isOpened ? 'translateY(0)' : 'translateY(-100vh',
              opacity: isOpened ? '1' : '0'
            }}
          >
            <CloseButton>Close</CloseButton>
            {children}
          </div>
        </div>
      );
    }

    return <Redirect push to="/" />;
  }
}

Modal.propTypes = {
  isOpened: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = ({ modalWithDetails }) => ({
  isOpened: getModalOpen(modalWithDetails)
});

const mapDispatchToProps = dispatch => ({
  onModalOpen: () => dispatch(openModal()),
  onModalClose: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
