import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CloseIcon from './CloseIcon';
import { closeModal } from '../../../../store/actions/index';

import './CloseButton.scss';
import '../../Button/Button.scss';

const CloseButton = ({ onModalClose }) => (
  <div className="close-button" onClick={onModalClose}>
    <CloseIcon />
  </div>
);

CloseButton.propTypes = {
  onModalClose: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  onModalClose: () => dispatch(closeModal())
});

export default connect(undefined, mapDispatchToProps)(CloseButton);
