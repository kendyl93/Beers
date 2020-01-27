import React, { Component } from 'react';

import './LoadingSpinner.scss';

const Loading = () => {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loading;
