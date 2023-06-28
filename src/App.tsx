import { useEffect, useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContext, TodoContext, UserContext } from "./utils/Contexts";
import Toaster from "./components/Toaster";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./components/Dashboard";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";

export default function App() {
  // theme funcitons
  const getTheme = () => {
    const themeS = localStorage.getItem("theme");
    if (themeS) {
      return JSON.parse(themeS);
    }
    return "dark";
  };
  const [themeMode, setThemeMode] = useState<PaletteMode>(
    getTheme() === "light" ? "light" : "dark"
  );
  const defaultTheme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeMode));
  }, [themeMode]);

  const changeTheme = () => {
    themeMode === "dark" ? setThemeMode("light") : setThemeMode("dark");
  };

  // toast functions
  const [toastContent, setToastContent] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const handleClose = () => {
    setToastContent((prev: any) => ({ ...prev, open: false }));
  };

  const triggerToast = (severity: String, message: String) => {
    setToastContent((prev: any) => ({
      ...prev,
      open: true,
      severity: severity,
      message: message,
    }));
  };

  // model related functions
  const [modelContent, setModelContent] = useState({
    open: false,
    title: "",
    message: "",
  });

  const triggerModel = (
    title: String,
    message: String,
    type: boolean,
    id: Number
  ) => {
    setModelContent((prev: any) => ({
      ...prev,
      open: true,
      title: title,
      message: message,
      isDelete: type,
      id: id,
    }));
  };

  const handleCloseModel = () => {
    setModelContent((prev: any) => ({
      ...prev,
      open: false,
      title: "",
      message: "",
    }));
  };
  // user info related funcionssss
  const [userInfo, setUserInfo] = useState<any>(
    JSON.parse(localStorage.getItem("user") || JSON.stringify("undefined"))
  );

  useEffect(() => {
    userInfo != "undefined" &&
      localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);

  const logout = () => {
    localStorage.removeItem("user");
    setUserInfo("undefined");
    handleCloseModel()
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

  //  todo related functions
  const [todo, setTodo] = useState<any>(
    JSON.parse(localStorage.getItem("todo") || JSON.stringify("undefined"))
  );

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const createTodo = async (temp: String) => {
    if (temp.trim() === "" ) {
      return triggerToast("warning", "Cannot create empty todo");
    }
    setTodo((prev: any) => {
      if (prev && prev != "undefined") {
        return {
          ...prev,
          userId: userInfo[0].id,
          todos: [
            ...prev?.todos,
            {
              id: prev?.todos?.length + 1 || 0,
              title: temp,
              subTodo: [],
              active: true,
            },
          ],
        };
      } else {
        return {
          userId: userInfo[0].id,
          todos: [{ id: 0, title: temp, subTodo: [], active: true }],
        };
      }
    });
    triggerToast("success", "Todo created");
  };

  const markCompleted = (id: Number) => {
    const newTodo = todo.todos.map((item: any) => {
      if (item.id === id) {
        item.active = false;
      }
      return item;
    });
    setTodo((prev: any) => ({ ...prev, todos: newTodo }));
  };

  const checkSubTodoFinished = (id: Number) => {
    const temp = todo.todos.filter((item: any) => item.id === id);
    if (temp[0].subTodo.length === 0) return true;

    for (let i = 0; i < temp[0].subTodo.length; i++) {
      if (temp[0].subTodo[i].active) {
        return false;
      } else {
        return true;
      }
    }
  };

  const deleteTodo = (id: Number) => {
    if (checkSubTodoFinished(id)) {
      const newTodo = todo.todos.filter((item: any) => item.id !== id);
      setTodo((prev: any) => ({ ...prev, todos: newTodo }));
      triggerToast("success", "Todo deleted successfully");
    } else {
      triggerToast("warning", "some SubTodo is active");
    }
    handleCloseModel()
  };

  // subtodo related functions

  const createSubTodo = (id: Number, tempSubTodo: String) => {
    const newTodo = todo.todos.map((item: any) => {
      if (item.id === id) {
        item.subTodo.push({
          id: item.subTodo.length + 1,
          title: tempSubTodo,
          active: true,
        });
      }
      return item;
    });
    setTodo((prev: any) => {
      return {
        ...prev,
        todos: newTodo,
      };
    });
    triggerToast("success", "SubTodo created");
  };

  const markSubTodoCompleted = (parId: any, id: Number) => {
    const newTodo = todo.todos.map((item: any) => {
      if (item.id === parId) {
        item.subTodo.map((it2: any) => {
          if (it2.id === id) {
            it2.active = false;
          }
        });
      }
      return item;
    });
    setTodo((prev: any) => {
      return {
        ...prev,
        todos: newTodo,
      };
    });
  };

  const deleteSubTodo = (parId: any, id: Number) => {
    const newTodo = todo.todos.map((item: any) => {
      if (item.id === parId) {
        item.subTodo = item.subTodo.filter((it2: any) => it2.id !== id);
      }
      return item;
    });
    setTodo((prev: any) => {
      return {
        ...prev,
        todos: newTodo,
      };
    });
    triggerToast("success", "SubTodo deleted");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <TodoContext.Provider
        value={{
          todo,
          createTodo,
          changeTheme,
          themeMode,
          logout,
          markCompleted,
          deleteTodo,
          createSubTodo,
          markSubTodoCompleted,
          deleteSubTodo,
        }}
      >
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <ToastContext.Provider
            value={{
              toastContent,
              triggerToast,
              triggerModel,
              modelContent,
              handleCloseModel,
            }}
          >
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
      </TodoContext.Provider>
    </ThemeProvider>
  );
}
