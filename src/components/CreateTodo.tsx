import { AddCircleOutlineRounded, PlusOneOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React from "react";

export default function CreateTodo() {
  return (
    <Box
      sx={{
        margin: 1,
        display: "flex",
        alignItems: "center",
        padding:2
      }}
    >
      <TextField
        margin="normal"
        fullWidth
        id="text"
        placeholder="Create todo"
        autoFocus
      />
      <IconButton aria-label="add" size="large">
        <AddCircleOutlineRounded fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
