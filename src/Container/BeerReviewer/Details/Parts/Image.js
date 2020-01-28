import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ children, image, imageUrl }) => (
  <div
    className={image ? 'bottle-cover' : 'keg-cover'}
    style={{
      width: '150px',
      height: image ? '350px' : '250px',
      backgroundImage: `url("${imageUrl}")`
    }}
  >
    {children}
  </div>
);

Image.propTypes = {
  children: PropTypes.node,
  imageUrl: PropTypes.string,
  image: PropTypes.bool
};

export default Image;
