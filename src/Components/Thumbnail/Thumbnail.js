import React from 'react';
import PropTypes from 'prop-types';

import beerThumbnail from './beerThumbnail.png';

import './Thumbnail.scss';

const NORMAL_HEIGHT = 140;
const XL_HEIGHT = 280;

const Thumbnail = ({
  item: { image_url: imageUrl, name, tagline },
  onlyImage = false,
  xl = false
}) => (
  <div className="Thumbnail">
    <img
      src={imageUrl || beerThumbnail}
      alt={name}
      height={xl ? XL_HEIGHT : NORMAL_HEIGHT}
      width="auto"
    />
    {!onlyImage && (
      <>
        <h4>{name}</h4>
        <p className="tagline">{tagline}</p>
      </>
    )}
  </div>
);

Thumbnail.propTypes = {
  item: PropTypes.object,
  image_url: PropTypes.string,
  name: PropTypes.string,
  tagline: PropTypes.string,
  onlyImage: PropTypes.bool,
  xl: PropTypes.bool
};

export default Thumbnail;
