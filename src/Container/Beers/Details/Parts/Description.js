import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ children }) => (
  <h3 className="description">{children}</h3>
);

Description.propTypes = { children: PropTypes.string };

export default Description;
