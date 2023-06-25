import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import NavBar from "./NavBar";
import CreateTodo from "./CreateTodo";
import TodoCard from "./TodoCard";
export default function Dashboard({ changeTheme, logout, checkFakeUser }: any) {
    useEffect(()=>{
        // checkFakeUser()
    },[])
  return (
    <Container>
      <NavBar />
      <CreateTodo />
      <TodoCard />
    </Container>
  );
}
