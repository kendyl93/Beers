import React from 'react';
import PropTypes from 'prop-types';

import Feature from './Feature';

const Features = ({ ibu, abv, ebc }) => (
  <div className="feature-container">
    <Feature>
      <strong>IBU </strong>
      {ibu}
    </Feature>
    <Feature>
      <strong>ABV </strong>
      {abv}
      <>%</>
    </Feature>
    <Feature>
      <strong>EBC </strong>
      {ebc}
    </Feature>
  </div>
);

Features.propTypes = {
  ibu: PropTypes.number,
  abv: PropTypes.number,
  ebc: PropTypes.number
};

export default Features;
