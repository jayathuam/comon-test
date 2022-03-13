import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import image from "../shared/images/game-icon/starburst.jpg";
import GameCard from "./GameCard";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
const mockProps = {
  name: "Starburst",
  icon: "images/game-icon/starburst.jpg",
  description: "Starburst is a high paced slot with some nice new",
  code: "starburst",
};

describe("Game card component", () => {
  it("Display all the data correctly", async () => {
    const wrapper = <GameCard {...mockProps} />;
    render(wrapper);
    expect(screen.getByText("Starburst")).toBeDefined();
    expect(
      screen.getByText("Starburst is a high paced slot with some nice new")
    ).toBeDefined();
    expect(screen.getByAltText("Starburst")).toHaveAttribute("src", image);
    const item = screen.getByRole("button");
    fireEvent.click(item);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/game/starburst");
  });
});
