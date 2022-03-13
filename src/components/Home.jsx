import React, { useState } from "react";
import styled from "@emotion/styled";

import Header from "./Header";
import GameDetails from "./GameDetails";
import { FilterContext } from "../contexts/FilterContext";
import logo from "../shared/images/logo.svg";
import { colors } from "../shared/styles/theme";

const ImageContainer = styled.div`
  display: flex;
`;

const LogoImage = styled.img`
  margin: 0 auto;
  width: 500px;
`;

const Container = styled.div`
  max-width: 1000px;
  height: auto;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  background-color: ${colors.secondaryText};
  margin-bottom: 15px;
`;

/**
 * Home component
 */
const Home = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: 0,
  });
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      <ImageContainer>
        <LogoImage src={logo} alt="logo" />
      </ImageContainer>
      <Container>
        <Header />
        <GameDetails />
      </Container>
    </FilterContext.Provider>
  );
};

export default Home;
