import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import LoadingIcon from "../../components/Loader";
import { colors } from "../../styles/theme";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

const StyledBtn = styled.button`
  background-color: ${({ bgcolor }) => bgcolor || "transparent"};
  border: 1px solid ${({ borderColor }) => borderColor || "#000"};
  color: ${({ textcolor }) => textcolor || "#000"};
  cursor: pointer;
  display: flex;
  font-family: Source Sans Pro, Arial, Verdana;
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: 600;
  justify-content: center;
  letter-spacing: 1.2px;
  line-height: 1.5;
  padding: 8px 24px;
  text-align: center;
  text-transform: uppercase;
  width: auto;

  &:hover {
    background-color: ${({ bgcolor }) => bgcolor || "#fff"};
  }

  &:disabled {
    background-color: #eee;
    border-color: #eee;
    color: ${colors.textDisabled};
    cursor: no-drop;
  }
`;

const StyledLoadingIcon = styled(LoadingIcon)`
  margin-left: 20px;
  margin-top: 2px;
  width: 40px;
`;

/**
 * Common button
 * @param {*} bgColor background color
 * @param {*} borderColor border color
 * @param {*} color text color
 * @param {*} disabled disable status
 * @param {*} fontSize font size of the content
 * @param {*} handleOnClick function which includes the action
 * @param {*} loading loading status of the action
 * @param {*} title content of the button string or object can be passed
 * @param {*} type button type submit|button or any
 * @param {*} chevronLeft add an arrow to left
 * @param {*} chevronRight add an arrow to right
 * @returns Button component
 */
const Button = ({
  bgColor,
  borderColor,
  color,
  disabled,
  fontSize,
  handleOnClick,
  loading,
  title,
  type,
  chevronLeft,
  chevronRight,
  ...rest
}) => {
  return (
    <StyledBtn
      type={type || "button"}
      onClick={(e) => handleOnClick && handleOnClick(e)}
      bgcolor={bgColor}
      textcolor={color}
      borderColor={borderColor}
      fontSize={fontSize}
      disabled={disabled}
      {...rest}
    >
      {chevronLeft && <ChevronLeftIcon color={colors.secondaryText} />}
      {title}
      {loading && <StyledLoadingIcon isLoading={loading} small />}
      {chevronRight && <ChevronRightIcon color={colors.secondaryText} />}
    </StyledBtn>
  );
};

Button.propTypes = {
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.string,
  type: PropTypes.string,
  handleOnClick: PropTypes.func,
  loading: PropTypes.bool,
  chevronLeft: PropTypes.bool,
  chevronRight: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default Button;
