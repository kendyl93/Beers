import React from 'react';

const RollingSpinner = ({ ...rest }) => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...rest}>
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#00d664"
      strokeWidth="10"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
      transform="rotate(235.762 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
  </svg>
);

export default RollingSpinner;
