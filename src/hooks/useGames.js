import { useQuery } from "react-query";

import axios from "../utils/axios";

/**
 * Hook to return Game details for game selection
 * @returns {object} returns a object which contains different status of the data fetching process
 * example object
 * [{
 *  name: "subs",
 *  icon: "icon",
 *  code: "xxx",
 *  description: "",
 *  categoryIds: [0,1],
 * },...]
 */
const useGames = () => {
  const { isLoading, error, data } = useQuery(
    "games",
    async () => await axios.get("games")
  );

  return {
    isLoading,
    error,
    data: data?.data || undefined,
  };
};

export { useGames };
