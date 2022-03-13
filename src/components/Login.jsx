import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import Button from "../shared/components/Button";
import Input from "../shared/components/Input";
import { useLogin } from "../hooks/useLogin";
import { colors } from "../shared/styles/theme";

const Wrapper = styled.div`
  background-color: ${colors.selectedBackground};
  display: flex;
  height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
  width: 100%;
`;

const Content = styled.div`
  background-color: ${colors.secondaryText};
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 350px;
  padding: 48px;
  width: 100%;

  @media screen and (max-width: 520px) {
    padding: 35px 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledH1 = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0 auto 16px;
  text-align: center;
`;

const ErrorText = styled.span`
  color: ${colors.error};
  margin-bottom: 12px;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
`;

const StyledTextBox = styled(Input)`
  margin-bottom: 15px;
`;

/**
 * Login component
 */
const Login = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const [errors, setErrors] = useState({});
  const { auth, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // redirect back to the previous page for already logged in users
  useEffect(() => {
    if (auth?.status === "success") {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [auth]);

  // redirect to home page for success login
  const onSuccess = ({ data }) => {
    const from = location.state?.from?.pathname || "/";
    setAuthData({ ...data, username: loginDetails.username });
    navigate(from, { replace: true });
  };
  const { isLoading, authenticate, isError } = useLogin({ onSuccess });

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: undefined });
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrors({ network: undefined });
    if (!loginDetails.username) {
      setErrors({ ...errors, username: "Username is required" });
      return;
    }
    if (!loginDetails.password) {
      setErrors({ ...errors, password: "Password is required" });
      return;
    }
    authenticate(loginDetails);
  };

  return (
    <Wrapper>
      <Content>
        <Form noValidate onSubmit={submit}>
          <StyledH1>Welcome</StyledH1>

          {isError && (
            <ErrorText>Incorrect Username, Email or Password</ErrorText>
          )}

          <FormContent>
            <Label>username *</Label>
            <StyledTextBox
              id="username"
              name="username"
              value={loginDetails.username || ""}
              error={errors.username !== undefined}
              placeholder="Enter your username"
              onChange={onValueChange}
            />
            <ErrorText>{errors.username}</ErrorText>
            <Label>password *</Label>
            <StyledTextBox
              id="password"
              name="password"
              type="password"
              value={loginDetails.password || ""}
              error={errors.password !== undefined}
              placeholder="Enter your password"
              onChange={onValueChange}
            />
            <ErrorText>{errors.password}</ErrorText>
          </FormContent>

          <StyledButton
            type="submit"
            title="Login"
            bgcolor={colors.colorBlack}
            color={colors.secondaryText}
            handleOnClick={submit}
            loading={isLoading}
          />
        </Form>
      </Content>
    </Wrapper>
  );
};

export default Login;
