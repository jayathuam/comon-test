import { useMutation } from "react-query";

import axios from "../utils/axios";

/**
 * Hook to authenticate user
 * @param {Function} onError: function contains the actions for errors
 * @param {Function} onSuccess: function contains the actions for successful login
 * @returns {object} returns a object which contains different status and the mutation function for login
 * example object
 * {
 *  isLoading: false,
 *  authenticate: () => {...},
 * }
 * when running the authentication function username and password need to be pass as params
 * EX: authenticate({ username: "xxx", password: "xxxx"})
 */
const useLogin = ({ onError, onSuccess }) => {
  const { isLoading, mutate } = useMutation(
    async (userData) => {
      return await axios.post("login", userData);
    },
    { onSuccess, onError }
  );

  return {
    isLoading,
    authenticate: mutate,
  };
};

export { useLogin };
