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
import SubTodoCard from "./SubTodoCard";

export default function TodoCard() {
  const { todo, markCompleted, deleteTodo, createSubTodo }: any =
    useContext(TodoContext);
  const [todoExpand, setTodoExpand] = useState(null);
  return (
    <Container maxWidth="sm">
      {todo &&
        todo?.todos?.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              sx={{
                padding: 2,
                margin: 2,
                borderBottom: "1px solid #fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {todoExpand === index ? (
                    <ArrowDropUp onClick={() => setTodoExpand(index)} fontSize="large"/>
                  ) : (
                    <ArrowDropDown onClick={() => setTodoExpand(index)} fontSize="large"/>
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
                  <AddCircleOutlineRounded
                    onClick={() => createSubTodo(item.id, "first subtodo")}
                  />
                  {item.active ? (
                    <CheckCircleOutlineOutlined
                      onClick={() => markCompleted(item.id)}
                    />
                  ) : (
                    <DeleteForeverOutlined
                      onClick={() => deleteTodo(item.id)}
                    />
                  )}
                </Box>
              </Box>
              {todoExpand === index && <SubTodoCard data={item} />}
            </Box>
          );
        })}
    </Container>
  );
}
