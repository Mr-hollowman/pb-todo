import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import CreateTodo from "./CreateTodo";
import TodoCard from "./TodoCard";
import MyModel from "./MyModel";
import { TodoContext } from "../utils/Contexts";
export default function Dashboard({ checkFakeUser }: any) {
  const { activePage }: any = useContext(TodoContext);
  useEffect(() => {
    // checkFakeUser()
  }, []);
  return (
    <Container>
      <MyModel />
      <NavBar />
      {activePage !== "Finished" && <CreateTodo />}
      <TodoCard />
    </Container>
  );
}
