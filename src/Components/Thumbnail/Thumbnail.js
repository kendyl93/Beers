import React from 'react';
import PropTypes from 'prop-types';

import './Thumbnail.scss';

const Thumbnail = ({ item: { image_url: imageUrl, name, tagline } }) => {
  const image = !/keg\.png/i.test(imageUrl);

  const style = {
    width: '100px',
    height: image ? '150px' : '140px',
    backgroundImage: `url("${imageUrl}")`
  };

  return (
    <div className="Thumbnail">
      <div className={image ? 'bottle-cover' : 'keg-cover'} style={style} />
      <div className="title">{name}</div>
      <div className="slogan">{tagline}</div>
    </div>
  );
};

Thumbnail.propTypes = {
  item: PropTypes.object,
  image_url: PropTypes.string,
  name: PropTypes.string,
  tagline: PropTypes.string
};

export default Thumbnail;
