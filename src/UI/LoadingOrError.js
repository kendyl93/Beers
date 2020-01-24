import React from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import ErrorView from './Error/ErrorView';

const LoadingOrError = ({ error }) => (error ? <ErrorView /> : <Spinner />);

LoadingOrError.propTypes = {
  error: PropTypes.object
};

export default LoadingOrError;
