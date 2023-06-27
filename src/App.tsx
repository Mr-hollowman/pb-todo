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
    const res = temp?.subTodo?.map((item: any) => {
      if (item.active) {
        return true;
      } else {
        return false;
      }
    });
    return res;
  };

  const deleteTodo = (id: Number) => {
    const newTodo = todo.todos.filter((item: any) => item.id !== id);
    setTodo((prev: any) => ({ ...prev, todos: newTodo }));
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
  };

  const markSubTodoCompleted = (parId: any, id: Number) => {
    const newTodo = todo.todos.map((item: any) => {
      if (item.id === parId) {
        item.subTodo.map((it2:any)=>{
          if(it2.id === id){
            it2.active = false
          }
        })
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
        }}
      >
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
      </TodoContext.Provider>
    </ThemeProvider>
  );
}
