import { FiberManualRecordRounded, PlayArrow } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function SubTodoCard({ data }: any) {
  return (
    <Box sx={{padding:2}}>
      {data?.subTodo?.map((item: any, index: Number) => {
        return (
          <Box key={index + "100"} sx={{ display: "flex", gap:'10px' }}>
            <FiberManualRecordRounded fontSize="small" />
            <Typography sx={{ color: "info.main" }}>
              {item.title}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
