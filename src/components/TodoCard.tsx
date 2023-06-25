import { Box, Container, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { TodoContext } from "../utils/Contexts";
import {
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";

export default function TodoCard() {
  const { todo }: any = useContext(TodoContext);
  const [todoExpand, setTodoExpand] = useState(null);
  console.log(todoExpand, "todo expand");
  return (
    <Container maxWidth="sm">
      {todo &&
        todo?.todos?.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 1,
                bgcolor: "text.secondary",
                margin:2
              }}
            >
              {todoExpand === index ? (
                <ArrowDropUp onClick={() => setTodoExpand(index)} />
              ) : (
                <ArrowDropDown onClick={() => setTodoExpand(index)} />
              )}
              <Box>
                <Typography>{item.title}</Typography>
              </Box>
            </Box>
          );
        })}
    </Container>
  );
}
