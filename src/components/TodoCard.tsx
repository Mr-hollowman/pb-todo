import { Box, Container, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { TodoContext } from "../utils/Contexts";
import {
  AddCircleOutlineRounded,
  ArrowDropDown,
  ArrowDropUp,
  CheckCircleOutlineOutlined,
  DeleteForeverOutlined,
} from "@mui/icons-material";

export default function TodoCard() {
  const { todo, markCompleted, deleteTodo }: any = useContext(TodoContext);
  const [todoExpand, setTodoExpand] = useState(null);
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
                padding: 2,
                margin: 2,
                gap: 1,
                borderBottom: "1px solid #fff",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {todoExpand === index ? (
                  <ArrowDropUp onClick={() => setTodoExpand(index)} />
                ) : (
                  <ArrowDropDown onClick={() => setTodoExpand(index)} />
                )}
                <Box>
                  {
                    <Typography
                      style={{
                        textDecoration: item.active ? "none" : "line-through",
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <AddCircleOutlineRounded  />
                {item.active ? (
                  <CheckCircleOutlineOutlined
                    onClick={() => markCompleted(item.id)}
                  />
                ) : (
                  <DeleteForeverOutlined onClick={() => deleteTodo(item.id)} />
                )}
              </Box>
            </Box>
          );
        })}
    </Container>
  );
}
