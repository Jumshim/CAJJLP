import React from "react";
import { useState } from "react";

import { createContext } from "react";

/** Establishes an Authorization context with the fields token, login, and logout
 * Token, login, and logout can then be accessed in other React components through const {...} = useContext(AuthContext);
 * Add Token into the 'Authorization' Header in protected API requests!
 */
export const AuthContext = createContext({
  token: null,
  login: () => {},
  logout: () => {},
});

/** Creates an Authorization Wrapper with proper login and logout helper functions */

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
