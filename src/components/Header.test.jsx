import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import avatar from "../shared/images/avatar/eric.jpg";
import { useLogout } from "../hooks/useLogout";
import { FilterContext } from "../contexts/FilterContext";
import { AuthContext } from "../contexts/AuthContext";
import Header from "./Header";

jest.spyOn(window, "alert").mockImplementation(() => {});

jest.mock("../hooks/useLogout", () => ({
  useLogout: jest.fn(),
}));

const setFilters = jest.fn();
const setAuthData = jest.fn();
const onError = jest.fn();
const onSuccess = jest.fn();
const logoutMock = jest.fn();

const mockedContextData = {
  filters: { search: "", category: 0 },
  setFilters,
};

const mockedAuthContextData = {
  auth: {
    status: "success",
    player: {
      name: "Eric Beard",
      avatar: "images/avatar/eric.jpg",
      event: "I saw you won 500 SEK last time!",
    },
    username: "eric",
  },
  setAuthData,
};

const logoutMockResponse = {
  status: "success",
};

describe("Header component", () => {
  it("Display Header", async () => {
    useLogout.mockImplementation(() => ({
      isLoading: false,
      logoutUser: logoutMock,
    }));
    render(
      <AuthContext.Provider value={mockedAuthContextData}>
        <FilterContext.Provider value={mockedContextData}>
          <Header />
        </FilterContext.Provider>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Log out")).toBeDefined();
    expect(screen.getByText("Eric Beard")).toBeDefined();
    expect(screen.getByText("I saw you won 500 SEK last time!")).toBeDefined();
    expect(screen.getByAltText("Eric Beard")).toHaveAttribute("src", avatar);
  });
  it("Display logout error", async () => {
    useLogout.mockImplementation(() => ({
      isLoading: false,
      logoutUser: logoutMock.mockImplementation(() => onError("error")),
    }));
    render(
      <AuthContext.Provider value={mockedAuthContextData}>
        <FilterContext.Provider value={mockedContextData}>
          <Header />
        </FilterContext.Provider>
      </AuthContext.Provider>
    );
    const item = screen.getByRole("button");
    fireEvent.click(item);
    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith("error");
    });
  });
  it("Logout success", async () => {
    useLogout.mockImplementation(() => ({
      isLoading: false,
      logoutUser: logoutMock.mockImplementation(() =>
        onSuccess(logoutMockResponse)
      ),
    }));
    render(
      <AuthContext.Provider value={mockedAuthContextData}>
        <FilterContext.Provider value={mockedContextData}>
          <Header />
        </FilterContext.Provider>
      </AuthContext.Provider>
    );
    const item = screen.getByRole("button");
    fireEvent.click(item);
    await waitFor(() => {
      expect(logoutMock).toHaveBeenCalledTimes(1);
      expect(logoutMock).toHaveBeenCalledWith({ username: "eric" });
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledWith(logoutMockResponse);
    });
  });
  it("Search box", async () => {
    useLogout.mockImplementation(() => ({
      isLoading: false,
      logoutUser: logoutMock.mockImplementation(() =>
        onSuccess(logoutMockResponse)
      ),
    }));
    render(
      <AuthContext.Provider value={mockedAuthContextData}>
        <FilterContext.Provider value={mockedContextData}>
          <Header />
        </FilterContext.Provider>
      </AuthContext.Provider>
    );
    const item = screen.getByRole("textbox");
    fireEvent.change(item, { target: { value: "jack" } });
    await waitFor(() => {
      expect(setFilters).toHaveBeenCalledTimes(1);
      expect(setFilters).toHaveBeenCalledWith({ category: 0, search: "jack" });
    });
  });
});
