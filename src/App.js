import React, { useState, useEffect } from "react";
import Landing from "./Components/Landing";
import LoggedIn from "./Components/LoggedIn";
import Nav from "./Components/Nav";
import { WaverlyContext } from './Contexts/WaverlyContext';
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [logIn, setLogIn] = useState(false);
  const [settingActive, setSettingActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [Dark, setDark] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isDark = localStorage.getItem("dark");
    if (isLoggedIn === "true") {
      setLogIn(true);
    }
    if (isDark === true) {
      setDark(true);
    }
  }, []);

  return (
    <>
      <WaverlyContext.Provider value={{ Dark, setDark }}>
        <Router>
          <div>
            <Nav
              logIn={logIn}
              setSettingActive={setSettingActive}
              menuActive={menuActive}
              setMenuActive={setMenuActive}
              Dark={Dark}
              setDark={setDark}
            />

            <Routes>
              {logIn ? (
                <Route
                  exact
                  path="/"
                  element={
                    <LoggedIn
                      settingActive={settingActive}
                      setSettingActive={setSettingActive}
                      menuActive={menuActive}
                      setMenuActive={setMenuActive}
                      Dark={Dark}
                      setDark={setDark}
                    />
                  }
                />
              ) : (
                <Route exact path="/" element={<Landing logIn={setLogIn} />} />
              )}
            </Routes>
          </div>
        </Router>
      </WaverlyContext.Provider>
    </>
  );
}

export default App;
