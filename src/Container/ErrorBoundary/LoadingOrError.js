import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../Components/UI/LoadingSpinner/Spinner';
import ErrorView from './Error/ErrorView';

const LoadingOrError = ({ error }) => (error ? <ErrorView /> : <Spinner />);

LoadingOrError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default LoadingOrError;
