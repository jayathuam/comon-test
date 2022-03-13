import { createContext } from "react";

/**
 * This will be used to state management of the search string and other filters.
 * sample state object:
 * {
 *   search: string,
 *   category: int
 * }
 */
export const FilterContext = createContext({});
