import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../shared/components/Button";
import { colors } from "../shared/styles/theme";

const GameWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  color: ${colors.error};
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
  margin-bottom: 25px;
  margin-left: 25px;
`;

/**
 * Render game using the comon lib
 */
const GamePlay = () => {
  const [error, setError] = useState(false);
  const { code } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (code) {
      try {
        // eslint-disable-next-line no-undef
        comeon.game.launch(code);
      } catch (ex) {
        // to display error
        setError(true);
        console.log(ex);
      }
    }
  }, [code]);
  return (
    <>
      <StyledButton
        title="Go back"
        bgcolor={colors.colorBlack}
        color={colors.secondaryText}
        handleOnClick={() => navigate("/")}
        chevronLeft
      />
      {error && (
        <ErrorContainer>
          There is something wrong. Can not play at the moment.
        </ErrorContainer>
      )}
      <GameWrapper id="game-launch" />
    </>
  );
};

export default GamePlay;
