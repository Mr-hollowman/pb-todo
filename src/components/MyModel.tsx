import React, { useContext } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ToastContext, TodoContext } from "../utils/Contexts";

export default function MyModel() {
  const { modelContent, handleCloseModel }: any = useContext(ToastContext);
  const { deleteTodo }: any = useContext(TodoContext);
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
            onClick={() => deleteTodo(modelContent.id)}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
