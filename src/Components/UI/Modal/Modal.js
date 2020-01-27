import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import Backdrop from '../Backdrop/Backdrop';
import CloseButton from './CloseButton/CloseButton';
import * as actionsCreator from '../../../store/actions/index';

import './Modal.scss';

class modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.isOpened !== this.props.isOpened ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    if (this.props.isOpened) {
      return (
        <div className="Modal-container">
          <Backdrop />
          <div
            className={this.props.isOpened ? 'Modal' : null}
            styles={{
              transform: this.props.isOpened
                ? 'translateY(0)'
                : 'translateY(-100vh',
              opacity: this.props.isOpened ? '1' : '0'
            }}
          >
            <CloseButton>Close</CloseButton>
            {this.props.children}
          </div>
        </div>
      );
    }

    return <Redirect push to="/" />;
  }
}

const mapStateToProps = state => {
  return { isOpened: state.modalDscrp.isOpened };
};

const mapDispatchToProps = dispatch => {
  return {
    onModalOpen: () => dispatch(actionsCreator.openModal()),
    onModalClose: () => dispatch(actionsCreator.closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modal);
