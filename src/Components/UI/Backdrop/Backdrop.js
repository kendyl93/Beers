import React from 'react';
import { connect } from 'react-redux';

import * as actionsCreator from '../../../store/actions/index';

import './Backdrop.scss';

const backdrop = props => {
  if (props.isOpened) {
    return <div className="Backdrop" onClick={props.onModalClose} />;
  }
};

const mapStateToProps = state => {
  return { isOpened: state.modalWithDetails.isOpened };
};

const mapDispatchToProps = dispatch => {
  return { onModalClose: () => dispatch(actionsCreator.closeModal()) };
};
export default connect(mapStateToProps, mapDispatchToProps)(backdrop);
