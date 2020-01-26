import React from 'react';
import { Route } from 'react-router-dom';

import AppSwitch from './AppSwitch';
import Modal from '../UI/Modal/Modal';
import Details from '../Beers/Components/Details';

const WithModal = () => {
  const singleElementPath = '/details/:id';

  return (
    <div>
      <AppSwitch singleElementPath={singleElementPath} />
      <Route path={singleElementPath}>
        <Modal>
          <Details />
        </Modal>
      </Route>
    </div>
  );
};

export default WithModal;
