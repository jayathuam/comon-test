import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import Button from "../shared/components/Button";
import { colors, breakpoints } from "../shared/styles/theme";

const GameCardWrapper = styled.div`
  display: flex;
  gap: 15px;
  padding: 25px 0px;
  border: none;
  border-bottom: 1px solid ${colors.softText};
  background-color: ${({ selected }) =>
    selected ? colors.selectedBackground : "unset"};

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const GameName = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;

const GameDetails = styled.div`
  color: ${colors.textMain};
  font-size: 12px;
  text-align: left;
`;

const PlayButton = styled(Button)`
  margin-top: 25px;
  margin-left: auto;
  margin-right: 35px;
  text-transform: capitalize;
`;

const GamePoster = styled.img`
  width: 120px;
  height: 120px;
`;

/**
 * This is use to render brief details of a game
 * @param {string} name : name of the game
 * @param {string} icon : icon url of the game
 * @param {string} description: description of the game
 * @param {string} code: code to run the game
 */
const GameCard = ({ name, icon, description, code }) => {
  const navigate = useNavigate();

  return (
    <GameCardWrapper>
      <GamePoster src={require(`../shared/${icon}`)} alt={name} />
      <div>
        <GameName>{name}</GameName>
        <GameDetails>{description}</GameDetails>
        <PlayButton
          title="Play"
          chevronRight
          bgcolor={colors.colorBlack}
          color={colors.secondaryText}
          handleOnClick={() => navigate(`/game/${code}`)}
        />
      </div>
    </GameCardWrapper>
  );
};

GameCard.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string,
  code: PropTypes.string,
};

export default GameCard;
