import React from 'react';
import PropTypes from 'prop-types';

import Tip from './Tip';

const emptyMessage = 'Probably you can drink it to every dish :)';

const Tips = ({ tips }) => (
  <div className="pairing-list row-spacing-half">
    <h5>Best served with:</h5>
    <ul className="pairing-list">
      {tips ? tips.map(tip => <Tip key={tip} tip={tip} />) : emptyMessage}
    </ul>
  </div>
);

Tips.propTypes = {
  tips: PropTypes.array
};

export default Tips;
