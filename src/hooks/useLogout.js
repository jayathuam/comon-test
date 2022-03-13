import { useMutation } from "react-query";

import axios from "../utils/axios";

/**
 * Hook to log out user
 * @param {Function} onError: function contains the actions for errors
 * @param {Function} onSuccess: function contains the actions for successful logout
 * @returns {object} returns a object which contains different status and the mutation function for logout
 * example object
 * {
 *  isLoading: false,
 *  logoutUser: () => {...},
 * }
 * when running the logout function logged in username need to be pass as params
 * EX: logoutUser({ username: "xxx"})
 */
const useLogout = ({ onError, onSuccess }) => {
  const { isLoading, mutate } = useMutation(
    async (userData) => {
      return await axios.post("logout", userData);
    },
    { onSuccess, onError }
  );

  return {
    isLoading,
    logoutUser: mutate,
  };
};

export { useLogout };
