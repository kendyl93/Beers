import React from 'react';
import PropTypes from 'prop-types';

const Name = ({ children }) => <h3 className="title">{children}</h3>;

Name.propTypes = { children: PropTypes.string };

export default Name;
