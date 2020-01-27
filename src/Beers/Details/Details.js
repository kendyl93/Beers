import React from 'react';
import PropTypes from 'prop-types';

import BeersList from '../Components/BeersList';

import './Details.scss';

const Details = ({
  similar,
  beer: {
    name,
    tagline,
    description,
    image_url: imagUrl,
    abv,
    ibu,
    ebc,
    food_pairing: foodPairing
  }
}) => {
  return (
    <div className="details-wrapper">
      <div className="details-body">
        <div>
          <img src={imagUrl} alt={name} height="100px" width="auto" />
        </div>
        <div>
          <h2>{name}</h2>
          <div>{tagline}</div>
          <div>
            <div>{ibu}</div>
            <div>{abv}</div>
            <div>{ebc}</div>
          </div>
          <div>{description}</div>
          {foodPairing.map(food => (
            <div>{food}</div>
          ))}
        </div>
      </div>
      <div className="similar-beers-wraper">
        <BeersList beers={similar} />
      </div>
    </div>
  );
};

Details.propTypes = {
  similar: PropTypes.array,
  beer: PropTypes.object,
  name: PropTypes.string,
  tagline: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  abv: PropTypes.number,
  ibu: PropTypes.number,
  ebc: PropTypes.number,
  foodPairing: PropTypes.array
};

export default Details;
