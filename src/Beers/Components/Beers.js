import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import BeersList from './BeersList';
import ErrorBoundary from '../../UI/Error/ErrorBoundary';
import LoadingOrError from '../../UI/LoadingOrError';

const Beers = ({
  fetchBeers,
  loadMoreBeers,
  pending,
  error,
  beers,
  moreBeers,
  page,
  loading
}) => {
  const anyBears = beers.length > 0;
  const maybeBeersFetched = !pending && anyBears;

  useEffect(() => {
    if (loading) {
      return;
    }
    console.log({ moreBeers });
    if (maybeBeersFetched || error) {
      return;
    }

    try {
      const maybeFirstPage = page === 1;

      if (maybeFirstPage && !pending) {
        fetchBeers(page);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  const view = maybeBeersFetched ? (
    <div>
      <BeersList beers={[...beers, ...moreBeers]} />
      <button
        type="button"
        onClick={() => {
          loadMoreBeers(page);
        }}
      >
        LOAD MORE
      </button>
    </div>
  ) : (
    <LoadingOrError error={error} />
  );

  return <ErrorBoundary>{view}</ErrorBoundary>;
};

Beers.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.bool,
  beers: PropTypes.array,
  fetchBeers: PropTypes.func,
  page: PropTypes.number
};

export default Beers;
