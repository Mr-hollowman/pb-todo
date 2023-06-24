import { Button } from "@mui/material";
import React from "react";

export default function Dashboard({ changeTheme }: any) {
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
    </div>
  );
}
