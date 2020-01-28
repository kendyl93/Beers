import React from 'react';
import PropTypes from 'prop-types';

const Feature = ({ children }) => (
  <div className="features-name">{children}</div>
);

Feature.propTypes = { children: PropTypes.string };

export default Feature;
