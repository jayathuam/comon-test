import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const IconButtonWrapper = styled.button`
  position: relative;
  overflow: hidden;
  display: flex;
  cursor: pointer;
  border: unset;
  background: unset;

  :hover {
    background-color: rgba(62, 62, 62, 0.04);
  }
`;

/**
 * A button which displays only an icon without a label.
 * @param {any} children icon/ component which should display inside the button
 * @param {func} onClick callback function provided from the parent's wrapper
 */
const IconButton = ({ children, onClick = () => {} }) => (
  <IconButtonWrapper
    onClick={(event) => {
      onClick(event);
    }}
  >
    {children}
  </IconButtonWrapper>
);

IconButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default IconButton;
