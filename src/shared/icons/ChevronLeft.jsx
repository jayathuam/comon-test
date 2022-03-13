import React from "react";
import PropTypes from "prop-types";

const ChevronLeft = ({ width, height, color }) => (
  <svg height={height || 24} viewBox="0 0 24 24" width={width || 24}>
    <path
      fill={color || "#000"}
      d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
    />
  </svg>
);

ChevronLeft.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};

export default ChevronLeft;
