import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { VisibilityIcon, VisibilityOffIcon, LenseIcon } from "../../icons";
import IconButton from "../IconButton";
import { colors } from "../../styles/theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ error }) => (error ? "4px" : "32px")};
  justify-content: center;
  border: 1px solid
    ${({ error }) => (error ? colors.error : colors.textSecondary)};

  &:hover {
    border-color: ${({ error }) =>
      error ? colors.error : colors.secondaryLight};
  }

  &:focus {
    border-color: ${colors.colorBlack};
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: 0;
  background: transparent;
  color: ${colors.colorBlack};
  font-family: Source Sans Pro, Arial, Verdana;
  font-size: 16px;
  letter-spacing: 0.4px;
  padding: 8px 5px;
  width: 100%;

  &:focus {
    color: ${colors.colorBlack};
    outline: none;
  }
  ::placeholder {
    color: ${colors.textSecondary};
    font-size: 16px;
    line-height: 20px;
  }
`;

const VisibilityButton = styled(IconButton)`
  border-radius: 50%;
  overflow: visible;
`;

const SearchButtonContainer = styled.div`
  margin-right: 10px;
`;

/**
 * Input field
 * @param {*} error status for errors
 * @param {*} maxVal max value for number input field
 * @param {*} minVal min value for number input field
 * @param {*} onChange action when changing the text
 * @param {*} placeholder placeholder text
 * @param {*} type type password|text or any
 * @param {*} value value of the field
 * @param {*} name name of the field
 * @param {*} id id of the field
 * @param {*} showPasswordVisibilityIcon to show and hide password
 * @param {*} showSearchIcon to indicate the search box
 * @returns Input field component
 */
const Input = ({
  error,
  maxVal,
  minVal,
  onChange,
  placeholder,
  type,
  value,
  name,
  id,
  showPasswordVisibilityIcon = type === "password",
  showSearchIcon,
  ...props
}) => {
  const [textBoxType, setTextBoxType] = useState(type || "text");

  const handleShowPassword = (e) => {
    e.preventDefault();
    setTextBoxType(textBoxType === "password" ? "text" : "password");
  };

  return (
    <Wrapper error={error} {...props}>
      <StyledInput
        type={textBoxType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        max={maxVal}
        min={minVal}
        error={error}
        name={name}
        id={id}
      />
      {showSearchIcon && (
        <SearchButtonContainer>
          <LenseIcon width={16} height={16} />
        </SearchButtonContainer>
      )}
      {showPasswordVisibilityIcon && (
        <VisibilityButton onClick={(e) => handleShowPassword(e)}>
          {textBoxType === "text" ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </VisibilityButton>
      )}
    </Wrapper>
  );
};

Input.propTypes = {
  error: PropTypes.any,
  maxVal: PropTypes.string,
  minVal: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  showSearchIcon: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showPasswordVisibilityIcon: PropTypes.bool,
};
export default Input;
