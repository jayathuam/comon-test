import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import { useGames } from "../hooks/useGames";
import { FilterContext } from "../contexts/FilterContext";
import GameList from "./GameList";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../hooks/useGames", () => ({
  useGames: jest.fn(),
}));

const setFilters = jest.fn();

const mockedContextData = {
  filters: { search: "", category: 0 },
  setFilters,
};

const searchContextData = {
  filters: { search: "jack", category: 0 },
  setFilters,
};

const mockGameList = [
  {
    name: "Starburst",
    description: "Starburst is a high paced slot with",
    code: "starburst",
    icon: "images/game-icon/starburst.jpg",
    categoryIds: [0, 2],
  },
  {
    name: "Jack Hammer",
    description: "Jack Hammer is a 25-line,",
    code: "jackhammer",
    icon: "images/game-icon/jackhammer.jpg",
    categoryIds: [0, 1],
  },
  {
    name: "Jack and the Beanstalk",
    description: "We is proud to present ",
    code: "jackandbeanstalk",
    icon: "images/game-icon/jackandbeanstalk.jpg",
    categoryIds: [0, 2, 1],
  },
  {
    name: "Dead or Alive",
    description: "The Elements slot has an Avalanche ",
    code: "deadoralive",
    icon: "images/game-icon/deadoralive.jpg",
    categoryIds: [0, 2],
  },
  {
    name: "Twin Spin",
    description: "The Twin Spin video ",
    code: "twinspin",
    icon: "images/game-icon/twinspin.jpg",
    categoryIds: [0, 1],
  },
];

describe("Game list component", () => {
  it("Display loading status", async () => {
    useGames.mockImplementation(() => ({
      isLoading: true,
    }));
    const wrapper = render(
      <FilterContext.Provider value={mockedContextData}>
        <GameList />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(wrapper.getByTestId("loader")).toBeDefined();
    });
  });
  it("Display error status", async () => {
    useGames.mockImplementation(() => ({
      isLoading: false,
      error: "this is a error",
    }));
    render(
      <FilterContext.Provider value={mockedContextData}>
        <GameList />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Error loading with data")).toBeDefined();
    });
  });
  it("Display game list when we have data", async () => {
    useGames.mockImplementation(() => ({
      isLoading: false,
      error: null,
      data: mockGameList,
    }));
    render(
      <FilterContext.Provider value={mockedContextData}>
        <GameList />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Jack Hammer")).toBeDefined();
      expect(screen.getByText("Twin Spin")).toBeDefined();
      expect(screen.getByText("Dead or Alive")).toBeDefined();
    });
  });
  it("Display filtered game list for search query", async () => {
    useGames.mockImplementation(() => ({
      isLoading: false,
      error: null,
      data: mockGameList,
    }));
    render(
      <FilterContext.Provider value={searchContextData}>
        <GameList />
      </FilterContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("Jack Hammer")).toBeDefined();
      expect(screen.queryByText("Twin Spin")).not.toBeInTheDocument();
      expect(screen.queryByText("Dead or Alive")).not.toBeInTheDocument();
      expect(screen.queryByText("Starburst")).not.toBeInTheDocument();
    });
  });
});
