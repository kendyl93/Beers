import React from 'react';

import SuggestionList from '../Similar/Similar';
import Details from '../Details/Details';
import './ModalPage.scss';

const ModalPage = () => (
  <div className="modal-page row-spacing-double">
    <Details />
    <SuggestionList />
  </div>
);

export default ModalPage;
