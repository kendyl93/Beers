import React from 'react';
import PropTypes from 'prop-types';

import SingleItem from './SingleItem';

const ListView = ({ items, handleItemClick }) => (
  <div className="list-wrapper row-spacing">
    {items.map(item => (
      <SingleItem handleItemClick={handleItemClick}>{item}</SingleItem>
    ))}
  </div>
);

ListView.propTypes = {
  items: PropTypes.array,
  handleItemClick: PropTypes.func
};

export default ListView;
