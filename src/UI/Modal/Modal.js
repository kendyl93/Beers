import React from 'react';
import { Link, useParams } from 'react-router-dom';

import Details from '../../Beers/Components/Details';

import './Modal.scss';

const Modal = () => {
  const { id } = useParams();

  return (
    <div className="modal-wrapper">
      <div className="modal-body">
        <h1>{id}</h1>
        <Details id={id} />
        <Link to="/">Close</Link>
      </div>
    </div>
  );
};

export default Modal;
