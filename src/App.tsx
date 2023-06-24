import React, { createContext, useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContext } from "./utils/ToastContextT";
import Toaster from "./components/Toaster";

export default function App() {
  const [toastContent, setToastContent] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const handleClose = () => {
    setToastContent((prev: any) => ({ ...prev, open: false }));
  };
  return (
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
        </Routes>
      </Router>
    </ToastContext.Provider>
  );
}
