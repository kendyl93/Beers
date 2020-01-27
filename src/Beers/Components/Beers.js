import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

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
    if (maybeBeersFetched || error || loading) {
      return;
    }

    try {
      const maybeFirstPage = page === 1;

      if (maybeFirstPage && !pending) {
        fetchBeers();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  const withMoreLoaded = [...beers, ...moreBeers];

  const view = maybeBeersFetched ? (
    <div>
      <BeersList beers={withMoreLoaded} />
      {loading ? (
        <LoadingOrError error={error} />
      ) : (
        <button
          type="button"
          onClick={() => {
            loadMoreBeers(page);
          }}
        >
          LOAD MORE
        </button>
      )}
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
  moreBeers: PropTypes.array,
  fetchBeers: PropTypes.func,
  loadMoreBeers: PropTypes.func,
  page: PropTypes.number,
  loading: PropTypes.bool
};

export default Beers;
