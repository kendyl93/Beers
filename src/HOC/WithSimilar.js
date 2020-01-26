import React from 'react';

const WithSimilar = similar => Component => props => (
  <Component similar={similar} {...props} />
);

export default WithSimilar;
