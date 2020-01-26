import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = ({ children }) => {
  const { id } = useParams();

  return (
    <div className="modal-wrapper">
      <div className="modal-body">
        <h1>{id}</h1>
        {children}
        <Link to="/">Close</Link>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node
};

export default Modal;
