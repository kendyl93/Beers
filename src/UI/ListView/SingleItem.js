import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { singleBeerEndpoint } from '../../api';
import Thumbnail from '../Thumbnail/Thumbnail';

const SingleItem = ({ children: item, handleItemClick }) => {
  const { id } = item;
  const beerEndpoint = singleBeerEndpoint(id);

  return (
    <div
      className="item-wrapper"
      key={id}
      onClick={() => handleItemClick(item)}
    >
      <Link to={beerEndpoint}>
        <Thumbnail item={item} />
      </Link>
    </div>
  );
};

SingleItem.propTypes = {
  children: PropTypes.object,
  handleItemClick: PropTypes.func
};

export default SingleItem;
