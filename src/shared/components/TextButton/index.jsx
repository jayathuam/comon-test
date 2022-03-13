import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

const StyledBtn = styled.button`
  background-color: ${({ bgcolor }) => bgcolor || "transparent"};
  border: none;
  color: ${({ textcolor }) => textcolor || "#000"};
  cursor: pointer;
  display: flex;
  font-family: Source Sans Pro, Arial, Verdana;
  font-size: ${({ fontSize }) => fontSize || "14px"};
  font-weight: 600;
  justify-content: center;
  letter-spacing: 1.2px;
  line-height: 1.5;
  text-align: center;
  width: auto;

  &:hover {
    background-color: ${({ bgcolor }) => bgcolor || "#fff"};
    border-color: ${colors.secondaryLight};
  }

  &:disabled {
    background-color: #eee;
    border-color: #eee;
    color: ${colors.textDisabled};
    cursor: no-drop;
  }
`;

/**
 * Button with text only
 * @param {*} bgColor background color
 * @param {*} color text color
 * @param {*} disabled disable the button by clicking
 * @param {*} fontSize font size of the button title
 * @param {*} handleOnClick function for the button action
 * @param {*} title content of the button string or object can be passed
 * @param {*} type button type submit|button and etc..
 * @returns button component
 */
const TextButton = ({
  bgColor,
  color,
  disabled,
  fontSize,
  handleOnClick,
  title,
  type,
  ...rest
}) => {
  return (
    <StyledBtn
      type={type || "button"}
      onClick={(e) => handleOnClick && handleOnClick(e)}
      bgcolor={bgColor}
      textcolor={color}
      fontSize={fontSize}
      disabled={disabled}
      {...rest}
    >
      {title}
    </StyledBtn>
  );
};

TextButton.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.string,
  type: PropTypes.string,
  handleOnClick: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default TextButton;
