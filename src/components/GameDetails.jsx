import React, { useState } from "react";
import styled from "@emotion/styled";

import Categories from "./Categories";
import GameList from "./GameList";
import TextButton from "../shared/components/TextButton";
import { colors, breakpoints } from "../shared/styles/theme";

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  padding: 0 25px;
`;

const Games = styled.div`
  margin-right: 25px;
  overflow-y: hidden;
  flex-grow: 3;
  width: min-content;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    display: ${({ isMobileVisible }) => (isMobileVisible ? "unset" : "none")};
  }
`;

const CategoryList = styled.div`
  flex-grow: 1;

  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ isMobileVisible }) => (isMobileVisible ? "unset" : "none")};
    overflow-y: auto;
  }
`;

const Title = styled.div`
  border-bottom: 1px solid ${colors.secondaryLight};
  font-weight: 600;
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const StyledTextButton = styled(TextButton)`
  display: none;
  margin-left: 25px;
  text-decoration: underline;
  margin-top: 15px;

  @media (max-width: ${breakpoints.mobile}) {
    display: unset;
  }
`;

/**
 * Render game list and categories
 */
const GameDetails = () => {
  // use this to navigate through game list and categories in mobile view
  const [showGameList, setShowGameList] = useState(true);
  return (
    <>
      <StyledTextButton
        title={showGameList ? "Select Category" : "Game List"}
        handleOnClick={() => setShowGameList(!showGameList)}
      />
      <Wrapper>
        <Games isMobileVisible={showGameList}>
          <Title>Games</Title>
          <GameList />
        </Games>
        <CategoryList isMobileVisible={!showGameList}>
          <Title>Categories</Title>
          <Categories />
        </CategoryList>
      </Wrapper>
    </>
  );
};

export default GameDetails;
