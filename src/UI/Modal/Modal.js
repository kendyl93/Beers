import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';

import Details from '../../Beers/Components/Details';

const Modal = () => {
  const history = useHistory();
  const { id } = useParams();

  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div
        className="modal"
        style={{
          position: 'absolute',
          background: '#fff',
          top: 25,
          left: '10%',
          right: '10%',
          padding: 15,
          border: '2px solid #444'
        }}
      >
        <h1>{id}</h1>
        <Details id={id} />
        <Link to="/">Close</Link>
      </div>
    </div>
  );
};

export default Modal;
