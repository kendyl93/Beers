import React from 'react';
import PropTypes from 'prop-types';

const EmptyView = () => <div>NO DATA</div>;

const BeersList = ({ beers }) => {
  return (
    <div>
      {beers ? (
        // eslint-disable-next-line camelcase
        beers.map(({ id, name }) => <h4 key={id}>{name}</h4>)
      ) : (
        <EmptyView />
      )}
    </div>
  );
};

BeersList.propTypes = { beers: PropTypes.array };

export default BeersList;
