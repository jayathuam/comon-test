import React from "react";
import PropTypes from "prop-types";

const ChevronRight = ({ width, height, color }) => (
  <svg height={height || 24} viewBox="0 0 24 24" width={width || 24}>
    <path
      fill={color || "#000"}
      d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
    />
  </svg>
);

ChevronRight.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};

export default ChevronRight;
