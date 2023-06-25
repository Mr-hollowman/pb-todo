import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import NavBar from "./NavBar";
import CreateTodo from "./CreateTodo";
export default function Dashboard({ changeTheme, logout, checkFakeUser }: any) {
    useEffect(()=>{
        // checkFakeUser()
    },[])
  return (
    <Container>
      <NavBar />
      <CreateTodo />
    </Container>
  );
}
