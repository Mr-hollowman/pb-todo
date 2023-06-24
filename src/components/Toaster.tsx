import React from "react";
import { Snackbar, AlertProps } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Toastypes } from "../assets/Types";
export default function Toaster({ open, handleClose, severity, message }: Toastypes) {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar anchorOrigin={{vertical:"top",horizontal:"right"}} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}   
      </Alert>
    </Snackbar>
  );
}
