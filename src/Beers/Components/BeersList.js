import React from 'react';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';

import './BeersList.scss';

const BeersList = ({ beers }) => {
  return (
    <div className="list-wrapper col-spacing">
      {beers ? (
        // eslint-disable-next-line camelcase
        beers.map(({ id, name, image_url: imageUrl }) => (
          <div className="item-wrapper" key={id}>
            <img src={imageUrl} alt={name} width="auto" height="100px" />
            {name}
          </div>
        ))
      ) : (
        <EmptyView />
      )}
    </div>
  );
};

BeersList.propTypes = { beers: PropTypes.array };

export default BeersList;