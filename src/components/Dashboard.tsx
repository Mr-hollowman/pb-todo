import { Button } from "@mui/material";
import React from "react";

export default function Dashboard({ changeTheme, logout }: any) {
  return (
    <div>
      Dash board
      <Button
        onClick={changeTheme}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        change theme
      </Button>
      <Button
        onClick={logout}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        logout
      </Button>
    </div>
  );
}
