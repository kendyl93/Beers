import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorView from './ErrorView';

class ErrorBoundary extends PureComponent {
  state = { error: undefined };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorView />;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
