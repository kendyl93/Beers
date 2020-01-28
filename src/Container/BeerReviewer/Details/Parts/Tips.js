import React from 'react';
import PropTypes from 'prop-types';

import Tip from './Tip';

const Tips = ({ tips }) => (
  <div className="pairing-list">
    <p>Best served with:</p>
    <ul className="pairing-list">
      {tips
        ? tips.map(tip => <Tip key={tip} tip={tip} />)
        : 'no specified food'}
    </ul>
  </div>
);

Tips.propTypes = {
  tips: PropTypes.array
};

export default Tips;
