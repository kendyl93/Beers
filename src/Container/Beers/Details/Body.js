import React from 'react';
import PropTypes from 'prop-types';

import Name from './Parts/Name';
import Tagline from './Parts/Tagline';
import Features from './Parts/Features';
import Description from './Parts/Description';
import Tips from './Parts/Tips';

const Body = ({ name, tagline, ibu, abv, ebc, description, foodPairing }) => (
  <div className="text-container row-spacing">
    <Name>{name}</Name>
    <Tagline>{tagline}</Tagline>
    <Features ibu={ibu} abv={abv} ebc={ebc} />
    <Description>{description}</Description>
    <Tips tips={foodPairing} />
  </div>
);

Body.propTypes = {
  name: PropTypes.string,
  tagline: PropTypes.string,
  ibu: PropTypes.number,
  abv: PropTypes.number,
  ebc: PropTypes.number,
  description: PropTypes.string,
  foodPairing: PropTypes.array
};

export default Body;
