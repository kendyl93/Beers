import React from 'react';
import { connect } from 'react-redux';

import * as actionsCreator from '../../../../store/actions/index';

import './CloseButton.scss';
import '../../Button/Button.scss';

const classesArray = ['Button', 'closeButton'];
let classes;
if (window.innerWidth <= 600) {
  classesArray.push('mobile-closeButton');
}
classes = classesArray.join(' ');

const CloseButton = props => (
  <button className={classes} onClick={props.onModalClose}>
    {props.children}
  </button>
);

const mapDispatchToProps = dispatch => {
  return {
    onModalClose: () => dispatch(actionsCreator.closeModal())
  };
};
export default connect(undefined, mapDispatchToProps)(CloseButton);
