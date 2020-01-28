import React from 'react';
import PropTypes from 'prop-types';

const Tagline = ({ children }) => <div className="slogan">{children}</div>;

Tagline.propTypes = { children: PropTypes.string };

export default Tagline;
