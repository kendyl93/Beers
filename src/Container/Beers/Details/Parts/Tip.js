import React from 'react';
import PropTypes from 'prop-types';

const Tip = ({ tip }) => <li key={tip}>{tip}</li>;

Tip.propTypes = { tip: PropTypes.string };

export default Tip;
