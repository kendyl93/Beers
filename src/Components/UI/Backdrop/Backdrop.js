import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../../store/actions/index';
import { getModalOpen } from '../../../store/actions/selectors';

import './Backdrop.scss';

const backdrop = ({ isOpened, onModalClose }) =>
  isOpened && <div className="backdrop" onClick={onModalClose} />;

const mapStateToProps = ({ modalWithDetails }) => ({
  isOpened: getModalOpen(modalWithDetails)
});

const mapDispatchToProps = dispatch => ({
  onModalClose: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(backdrop);
