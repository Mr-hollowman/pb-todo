import {
  CheckCircleOutlineOutlined,
  DeleteForeverOutlined,
  FiberManualRecordRounded,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function SubTodoCard({ data }: any) {
  return (
    <Box sx={{ padding: 2 }}>
      {data?.subTodo?.map((item: any, index: Number) => {
        return (
          <Box key={index + "100"} sx={{ display: "flex", gap: "10px" }}>
            <FiberManualRecordRounded fontSize="small" />
            <Typography sx={{ color: "info.main" }}>{item.title}</Typography>
            {item.active ? (
              <CheckCircleOutlineOutlined fontSize="small" onClick={() => {}} />
            ) : (
              <DeleteForeverOutlined fontSize="small" onClick={() => {}} />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
