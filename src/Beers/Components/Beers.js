import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import BeersList from './BeersList';
import ErrorBoundary from '../../UI/Error/ErrorBoundary';
import LoadingOrError from '../../UI/LoadingOrError';

const Beers = ({ fetchBeers, pending, error, beers, page }) => {
  const anyBears = beers.length > 0;
  const maybeBeersFetched = !pending && anyBears;
  const beersWrapper = useRef(null);

  useEffect(() => {
    if (maybeBeersFetched || error) {
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

  const loadMoreContent = async () => {
    await fetchBeers(page);

    const { current: { offsetHeight } = {} } = beersWrapper || {};

    if (offsetHeight) {
      window.scrollTo(0, offsetHeight);
    }
  };

  const view = maybeBeersFetched ? (
    <div ref={beersWrapper}>
      <BeersList beers={beers} />
      {pending ? (
        <LoadingOrError error={error} />
      ) : (
        <button type="button" onClick={loadMoreContent}>
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
  fetchBeers: PropTypes.func,
  page: PropTypes.number
};

export default Beers;
