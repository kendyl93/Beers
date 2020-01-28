import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { closeModal } from '../../../../store/actions/index';

import './CloseButton.scss';
import '../../Button/Button.scss';

const CloseButton = ({ onModalClose, children }) => (
  <button type="button" onClick={onModalClose}>
    {children}
  </button>
);

CloseButton.propTypes = {
  onModalClose: PropTypes.func,
  children: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  onModalClose: () => dispatch(closeModal())
});

export default connect(undefined, mapDispatchToProps)(CloseButton);
