import React from 'react';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';

const BeersList = ({ beers }) => {
  return (
    <div className="beers-wrapper">
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
