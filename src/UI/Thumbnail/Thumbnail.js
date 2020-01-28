import React from 'react';
import PropTypes from 'prop-types';

import beerThumbnail from './beerThumbnail.png';

const NORMAL_HEIGHT = 140;
const xlHeight = sourceUrl => (sourceUrl ? 280 : 180);

const Thumbnail = ({
  item: { image_url: imageUrl, name, tagline },
  onlyImage = false,
  xl = false
}) => {
  const sourceUrlOrDefault = imageUrl || beerThumbnail;
  const height = xl ? xlHeight(imageUrl) : NORMAL_HEIGHT;

  return (
    <div className="thumbnail-wrapper">
      <img src={sourceUrlOrDefault} alt={name} height={height} width="auto" />
      {!onlyImage && (
        <>
          <h4>{name}</h4>
          <p className="tagline">{tagline}</p>
        </>
      )}
    </div>
  );
};

Thumbnail.propTypes = {
  item: PropTypes.object,
  image_url: PropTypes.string,
  name: PropTypes.string,
  tagline: PropTypes.string,
  onlyImage: PropTypes.bool,
  xl: PropTypes.bool
};

export default Thumbnail;
