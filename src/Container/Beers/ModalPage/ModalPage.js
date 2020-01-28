import React from 'react';

import Similar from '../Similar/Similar';
import Details from '../Details/Details';
import './ModalPage.scss';
import ErrorBoundary from '../../ErrorBoundary/Error/ErrorBoundary';

const ModalPage = () => (
  <div className="modal-page row-spacing-double">
    <Details />
    <ErrorBoundary>
      <Similar />
    </ErrorBoundary>
  </div>
);

export default ModalPage;
