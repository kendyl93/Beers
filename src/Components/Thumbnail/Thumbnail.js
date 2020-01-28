import React from 'react';
import PropTypes from 'prop-types';

import './Thumbnail.scss';

const Thumbnail = ({ item: { image_url: imageUrl, name, tagline } }) => (
  <div className="Thumbnail">
    <img src={imageUrl} alt={name} height={140} width="auto" />
    <div className="title">{name}</div>
    <div className="slogan">{tagline}</div>
  </div>
);

Thumbnail.propTypes = {
  item: PropTypes.object,
  image_url: PropTypes.string,
  name: PropTypes.string,
  tagline: PropTypes.string
};

export default Thumbnail;
