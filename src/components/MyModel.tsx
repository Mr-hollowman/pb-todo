import React, { useContext, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ToastContext, TodoContext } from "../utils/Contexts";

export default function MyModel() {
  const { modelContent, handleCloseModel }: any = useContext(ToastContext);
  const { deleteTodo, logout, createSubTodo }: any = useContext(TodoContext);
  const [tempContent, setTempContent] = useState("");
  return (
    <Modal
      open={modelContent.open}
      onClose={handleCloseModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        {modelContent.isDelete ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modelContent.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modelContent.message}
            </Typography>
            <Box sx={{ marginTop: 3, display: "flex", gap: 1 }}>
              <Button variant="outlined" onClick={handleCloseModel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  modelContent.id ? deleteTodo(modelContent.id) : logout()
                }
              >
                Confirm
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modelContent.title}
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="text"
              placeholder="Create subTodo"
              autoFocus
              name="todo"
              onChange={(e)=>setTempContent(e.target.value)}
            />
            <Box sx={{ marginTop: 3, display: "flex", gap: 1 }}>
              <Button variant="outlined" onClick={handleCloseModel}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={() => createSubTodo(modelContent.id, tempContent)}>
                Confirm
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
