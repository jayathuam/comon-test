import { useQuery } from "react-query";

import axios from "../utils/axios";

/**
 * Hook to return category details for game selection
 * @returns {object} returns a object which contains different status of the data fetching process
 * example object
 * {
 *  isLoading: false,
 *  error: null,
 *  data: [{
 *    name: "xxxx",
 *    id: "1",
 *  },...],
 * }
 */
const useCategories = () => {
  const { isLoading, error, data } = useQuery(
    "categories",
    async () => await axios.get("categories")
  );

  return {
    isLoading,
    error,
    data: data?.data || undefined,
  };
};

export { useCategories };
