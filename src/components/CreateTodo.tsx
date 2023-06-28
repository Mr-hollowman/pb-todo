import { AddCircleOutlineRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../utils/Contexts";

export default function CreateTodo() {
  const { createTodo }: any = useContext(TodoContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createTodo(data.get("todo"));
    event.currentTarget.reset();
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        gap:2
      }}
    >
      <TextField
        margin="normal"
        fullWidth
        id="text"
        placeholder="Create todo"
        autoFocus
        name="todo"
      />
      <Button
        type="submit"
        sx={{
          padding: "10px 13px 10px 13px",
          margin: "5px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <AddCircleOutlineRounded fontSize="medium" />
        </Avatar>
        <Typography>Add</Typography>
      </Button>
    </Box>
  );
}
