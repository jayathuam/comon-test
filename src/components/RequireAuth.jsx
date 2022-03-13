import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

/**
 * Check for valid logged in user otherwise redirect to login screen
 * @param {*} children children component to render
 * @returns children component
 */
const RequireAuth = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  if (auth?.status !== "success") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.object,
};

export default RequireAuth;
