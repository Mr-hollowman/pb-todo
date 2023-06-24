import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContext, UserContext } from "./utils/Contexts";
import Toaster from "./components/Toaster";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [toastContent, setToastContent] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const handleClose = () => {
    setToastContent((prev: any) => ({ ...prev, open: false }));
  };

  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
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
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ToastContext.Provider>
    </UserContext.Provider>
  );
}
