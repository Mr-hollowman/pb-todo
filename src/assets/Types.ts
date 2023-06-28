import { SnackbarOrigin } from "@mui/material";

export interface Toastypes {
  open: any;
  handleClose: () => void;
  severity: any;
  message: String;
}

export interface ModelContentTypes {
  open: boolean;
  title: String;
  message: String;
  isDelete: boolean;
  id: number;
}

export interface ToastContentTypes {
  open: boolean;
  severity: String;
  message: String;
}
