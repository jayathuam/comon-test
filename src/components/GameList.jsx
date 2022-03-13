import React, { useContext } from "react";
import styled from "@emotion/styled";

import Loader from "../shared/components/Loader";
import GameCard from "./GameCard";
import { useGames } from "../hooks/useGames";
import { FilterContext } from "../contexts/FilterContext";

const StyledLoader = styled(Loader)`
  margin-top: 25px;
`;

/**
 * Render game list based on filters
 */
const GameList = () => {
  const { filters } = useContext(FilterContext);
  const { search, category } = filters;

  const { isLoading, error, data } = useGames();

  // filter games based on the search text and the category
  const filteredData = data?.filter(
    (item) =>
      item?.name.toLowerCase().includes(search.toLowerCase()) &&
      item?.categoryIds.includes(category)
  );

  return (
    <>
      {error && <div>Error loading with data</div>}
      {isLoading && <StyledLoader isLoading data-testid="loader" />}
      {!isLoading && filteredData?.length === 0 && <div>No result found</div>}
      {!isLoading &&
        filteredData?.length > 0 &&
        filteredData.map(({ icon, name, description, code }) => (
          <GameCard
            icon={icon}
            key={name}
            name={name}
            description={description}
            code={code}
          />
        ))}
    </>
  );
};

export default GameList;
