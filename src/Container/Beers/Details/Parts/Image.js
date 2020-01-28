import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ children, image, imageUrl }) => <div>{children}</div>;

Image.propTypes = {
  children: PropTypes.node,
  imageUrl: PropTypes.string,
  image: PropTypes.bool
};

export default Image;
