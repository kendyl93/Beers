import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import EmptyView from '../../UI/EmptyView';

import './BeersList.scss';

const BeersList = ({ beers }) => {
  return (
    <div className="list-wrapper row-spacing">
      {beers ? (
        // eslint-disable-next-line camelcase
        beers.map(({ id, name, image_url: imageUrl, tagline }) => (
          <Link to={`/details/${id}`} className="item-wrapper" key={id}>
            <img src={imageUrl} alt={name} width="auto" height="200px" />
            <div className="title-wrapper">
              <h4>{name}</h4>
            </div>
            <p className="tagline">{tagline}</p>
          </Link>
        ))
      ) : (
        <EmptyView />
      )}
    </div>
  );
};

BeersList.propTypes = { beers: PropTypes.array };

export default BeersList;
