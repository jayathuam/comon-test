import { createContext } from "react";

/**
 * This will be used to state management of Authentication
 * sample state object:
 * status: "success"
 * player: {
 *   avatar: "images/avatar/eric.jpg"
 *   event: "I saw you won 500 SEK last time!"
 *   name: "Eric Beard"
 * }
 * username: "eric"
 */
export const AuthContext = createContext({});
