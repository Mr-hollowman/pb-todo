import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import NavBar from "./NavBar";
export default function Dashboard({ changeTheme, logout, checkFakeUser }: any) {
    useEffect(()=>{
        // checkFakeUser()
    },[])
  return (
    <Container>
      <NavBar />
    </Container>
  );
}
