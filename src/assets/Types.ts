import { SnackbarOrigin } from "@mui/material";

export interface Toastypes {
  open: any;
  handleClose: () => void;
  severity: any;
  message: String;
}
