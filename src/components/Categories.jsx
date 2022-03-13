import React, { useContext } from "react";
import styled from "@emotion/styled";

import Loader from "../shared/components/Loader";
import TextButton from "../shared/components/TextButton";
import { useCategories } from "../hooks/useCategories";
import { FilterContext } from "../contexts/FilterContext";
import { colors } from "../shared/styles/theme";

const StyledLoader = styled(Loader)`
  margin-top: 25px;
`;

/**
 * Render category list of the games
 */
const Categories = () => {
  const { filters, setFilters } = useContext(FilterContext);
  const { isLoading, error, data } = useCategories();

  const onCategoryClick = (id) => {
    setFilters({ ...filters, category: id });
  };

  return (
    <>
      {error && <div>loading error</div>}
      {isLoading && <StyledLoader isLoading data-testid="loader" />}
      {!isLoading &&
        data?.length > 0 &&
        data.map(({ id, name }) => (
          <TextButton
            key={id}
            title={name}
            handleOnClick={() => onCategoryClick(id)}
            bgColor={
              id === filters.category ? colors.secondaryLight : "transparent"
            }
          />
        ))}
    </>
  );
};

export default Categories;
