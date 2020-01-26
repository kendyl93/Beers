import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import BeersList from './BeersList';
import ErrorBoundary from '../../UI/Error/ErrorBoundary';
import LoadingOrError from '../../UI/LoadingOrError';

const Beers = ({ fetchBeers, pending, error, beers, addPage, page }) => {
  const maybeBeersFetched = !pending && beers;

  useEffect(() => {
    if (maybeBeersFetched || error) {
      return;
    }

    try {
      fetchBeers();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  const view = maybeBeersFetched ? (
    <div>
      <BeersList beers={beers} />
      <button onClick={addPage}>asdasdasdasdasdasd</button>
    </div>
  ) : (
    <LoadingOrError error={error} />
  );

  return <ErrorBoundary>{view}</ErrorBoundary>;
};

Beers.propTypes = {
  error: PropTypes.bool,
  pending: PropTypes.bool,
  beers: PropTypes.array,
  fetchBeers: PropTypes.func
};

export default Beers;
