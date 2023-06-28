import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import NavBar from "./NavBar";
import CreateTodo from "./CreateTodo";
import TodoCard from "./TodoCard";
import MyModel from "./MyModel";
export default function Dashboard({ changeTheme, logout, checkFakeUser }: any) {
  useEffect(() => {
    // checkFakeUser()
  }, []);
  return (
    <Container>
      <MyModel />
      <NavBar />
      <CreateTodo />
      <TodoCard />
    </Container>
  );
}
