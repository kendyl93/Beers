import React from 'react';
import { Route } from 'react-router-dom';

import AppSwitch from './AppSwitch';
import Modal from '../UI/Modal/Modal';
import DetailsView from '../Beers/Details/DetailsView';

const WithModal = () => {
  const singleElementPath = '/details/:id';

  return (
    <div>
      <AppSwitch singleElementPath={singleElementPath} />
      <Route path={singleElementPath}>
        <Modal>
          <DetailsView />
        </Modal>
      </Route>
    </div>
  );
};

export default WithModal;
