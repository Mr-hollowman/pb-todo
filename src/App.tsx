import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContext, UserContext } from "./utils/Contexts";
import Toaster from "./components/Toaster";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./components/Dashboard";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";

export default function App() {
  const themeS = JSON.parse(localStorage.getItem("theme") || "dark");
  const [themeMode, setThemeMode] = useState<PaletteMode>(
    themeS === "light" ? "light" : "dark"
  );
  const defaultTheme = createTheme({
    palette: {
      mode: themeMode,
    },
  });
  const [toastContent, setToastContent] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const handleClose = () => {
    setToastContent((prev: any) => ({ ...prev, open: false }));
  };

  const [userInfo, setUserInfo] = useState<any>(
    JSON.parse(localStorage.getItem("user") || JSON.stringify("undefined"))
  );

  useEffect(() => {
    userInfo != "undefined" &&
      localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeMode));
  }, [themeMode]);

  const changeTheme = () => {
    themeMode === "dark" ? setThemeMode("light") : setThemeMode("dark");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserInfo("undefined");
  };

  // const checkFakeUser = async () => {
  //   const resp = await fetch(`${URL}/users`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const user = res.filter((item: any) => {
  //         return (
  //           item.mailId === userInfo[0].mailId &&
  //           item.password === userInfo[0].password
  //         );
  //       });
  //       return user;
  //     });
  //   if (resp.length === 0) {
  //     logout();
  //   }
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <ToastContext.Provider value={{ toastContent, setToastContent }}>
          <Toaster
            handleClose={handleClose}
            severity={toastContent.severity}
            open={toastContent.open}
            message={toastContent.message}
          />
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute userInfo={userInfo}>
                    <Dashboard
                      changeTheme={changeTheme}
                      logout={logout}
                      // checkFakeUser={checkFakeUser}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ToastContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}
