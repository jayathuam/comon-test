import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import { useLogin } from "../hooks/useLogin";
import { AuthContext } from "../contexts/AuthContext";
import Login from "./Login";

const mockedUsedNavigate = jest.fn();
const mockUsedLocation = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockUsedLocation,
}));

jest.mock("../hooks/useLogin", () => ({
  useLogin: jest.fn(),
}));

const setAuthData = jest.fn();
const onSuccess = jest.fn();
const loginMock = jest.fn();

const mockedAuthContextData = {
  auth: undefined,
  setAuthData,
};

const loginMockData = {
  username: "jack",
  password: "abc",
};

describe("Login component", () => {
  it("Login with errors", async () => {
    useLogin.mockImplementation(() => ({
      isLoading: false,
      authenticate: loginMock,
    }));
    render(
      <AuthContext.Provider value={mockedAuthContextData}>
        <Login />
      </AuthContext.Provider>
    );
    expect(screen.getByText("Welcome")).toBeDefined();
    const item = screen.getByRole("button", {
      name: "Login",
    });
    fireEvent.click(item);
    expect(screen.getByText("Username is required")).toBeDefined();
  });
  it("Display authentication errors", async () => {
    useLogin.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      authenticate: loginMock,
    }));
    render(
      <AuthContext.Provider value={mockedAuthContextData}>
        <Login />
      </AuthContext.Provider>
    );
    const username = screen.getByRole("textbox");
    fireEvent.change(username, { target: { value: "jack" } });
    const password = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(password, { target: { value: "abc" } });
    const loginBtn = screen.getByRole("button", {
      name: "Login",
    });
    fireEvent.click(loginBtn);
    await waitFor(() => {
      expect(
        screen.getByText("Incorrect Username, Email or Password")
      ).toBeDefined();
    });
  });
  it("Login success", async () => {
    useLogin.mockImplementation(() => ({
      isLoading: false,
      authenticate: loginMock.mockImplementation(() =>
        onSuccess(loginMockData)
      ),
    }));
    render(
      <AuthContext.Provider value={mockedAuthContextData}>
        <Login />
      </AuthContext.Provider>
    );
    const username = screen.getByRole("textbox");
    fireEvent.change(username, { target: { value: "jack" } });
    const password = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(password, { target: { value: "abc" } });
    const loginBtn = screen.getByRole("button", {
      name: "Login",
    });
    fireEvent.click(loginBtn);
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledTimes(1);
      expect(loginMock).toHaveBeenCalledWith(loginMockData);
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledWith(loginMockData);
    });
  });
});
