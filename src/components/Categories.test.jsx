import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { useCategories } from "../hooks/useCategories";
import { FilterContext } from "../contexts/FilterContext";
import Categories from "./Categories";
import { colors } from "../shared/styles/theme";

jest.mock("../hooks/useCategories", () => ({
  useCategories: jest.fn(),
}));

const setFilters = jest.fn();

const mockedContextData = {
  filters: { search: "", category: 0 },
  setFilters,
};

const mockCategoryList = [
  {
    id: 0,
    name: "ALL",
  },
  {
    id: 1,
    name: "VIDEO SLOTS",
  },
  {
    id: 2,
    name: "SLOT MACHINES",
  },
];

describe("Category list component", () => {
  it("Display loading status", async () => {
    useCategories.mockImplementation(() => ({
      isLoading: true,
    }));
    const wrapper = render(
      <FilterContext.Provider value={mockedContextData}>
        <Categories />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(wrapper.getByTestId("loader")).toBeDefined();
    });
  });
  it("Display error status", async () => {
    useCategories.mockImplementation(() => ({
      isLoading: false,
      error: "this is a error",
    }));
    render(
      <FilterContext.Provider value={mockedContextData}>
        <Categories />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("loading error")).toBeDefined();
    });
  });
  it("Display categories when we have data", async () => {
    useCategories.mockImplementation(() => ({
      isLoading: false,
      error: null,
      data: mockCategoryList,
    }));
    render(
      <FilterContext.Provider value={mockedContextData}>
        <Categories />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("ALL")).toBeDefined();
      expect(screen.getByText("VIDEO SLOTS")).toBeDefined();
      expect(screen.getByText("SLOT MACHINES")).toBeDefined();
    });
    const allBtn = screen.getByText("ALL");
    fireEvent.click(allBtn);
    expect(setFilters).toHaveBeenCalledTimes(1);
    expect(setFilters).toHaveBeenCalledWith({ category: 0, search: "" });
    expect(allBtn).toHaveStyle(`background-color: ${colors.secondaryLight}`);
  });
});
