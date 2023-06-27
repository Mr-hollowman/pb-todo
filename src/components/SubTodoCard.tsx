import { FiberManualRecordRounded, PlayArrow } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function SubTodoCard({ data }: any) {
  return (
    <Box>
      {data?.subTodo?.map((item: any, index: Number) => {
        return (
          <Box key={index + "100"} sx={{ display: "flex" }}>
            <FiberManualRecordRounded fontSize="small" />
            <Typography style={{ color: "text.secondary" }}>
              {item.title}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
