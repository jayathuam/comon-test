import "./lib/comeon.game-1.0.min";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { getData, saveData } from "./utils/localStorage";
import { AuthContext } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import GamePlay from "./components/GamePlay";
import Home from "./components/Home";

function App() {
  const [auth, setAuth] = useState({ ...getData("userInfo") });
  const setAuthData = (data) => {
    setAuth(data);
    saveData("userInfo", data);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuthData }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/game/:code"
          element={
            <RequireAuth>
              <GamePlay />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
