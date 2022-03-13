import React, { useContext } from "react";
import styled from "@emotion/styled";
import debounce from "lodash.debounce";

import { AuthContext } from "../contexts/AuthContext";
import { FilterContext } from "../contexts/FilterContext";
import Input from "../shared/components/Input";
import Button from "../shared/components/Button";
import { useLogout } from "../hooks/useLogout";
import { colors, breakpoints } from "../shared/styles/theme";

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  padding: 0 25px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  z-index: 1000000;
  background-color: ${colors.secondaryText};
  padding-bottom: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const UserWrapper = styled.div`
  flex-grow: 1;

  @media (max-width: ${breakpoints.mobile}) {
    flex-grow: unset;
  }
`;

const UserDetails = styled.div`
  margin-top: 15px;
  align-items: center;
  display: flex;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  border-radius: 50%;
`;

const UserName = styled.div`
  font-weight: 700;
`;

const StyledButton = styled(Button)`
  height: 40px;
  text-transform: capitalize;
`;

const StyledInput = styled(Input)`
  margin-top: 15px;
  min-width: 200px;
  margin-bottom: unset;
`;

/**
 * Render header bar with search and account details
 */
const Header = () => {
  const { auth, setAuthData } = useContext(AuthContext);
  const { filters, setFilters } = useContext(FilterContext);
  const { player, username } = auth;

  // display error alert for network problems when doing the log out
  const onError = () => {
    alert("network issue!! try again later");
  };
  // for successfully log out clear the user session
  const onSuccess = () => {
    setAuthData(null);
  };
  const { isLoading, logoutUser } = useLogout({ onError, onSuccess });

  const logout = () => {
    logoutUser({ username: username });
  };

  // handle the onChange event of the search input debounce time will be 300 ms
  const handleOnChange = debounce((text) => {
    setFilters({ ...filters, search: text });
  }, 300);

  return (
    <Wrapper>
      <UserWrapper>
        <UserDetails>
          <Avatar
            src={require(`../shared/${player?.avatar}`)}
            alt={player?.name}
          />
          <div>
            <UserName>{player?.name}</UserName>
            <div>{player?.event}</div>
          </div>
        </UserDetails>
        <StyledButton
          title="Log out"
          bgcolor={colors.colorBlack}
          color={colors.secondaryText}
          handleOnClick={logout}
          chevronLeft
          loading={isLoading}
        />
      </UserWrapper>
      <StyledInput
        id="search"
        name="search"
        placeholder="Search Game"
        showSearchIcon
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </Wrapper>
  );
};

export default Header;
