import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = ({ children }) => (
  <div className="modal-wrapper">
    <div className="modal-body">
      {children}
      <Link to="/">Close</Link>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node
};

export default Modal;
