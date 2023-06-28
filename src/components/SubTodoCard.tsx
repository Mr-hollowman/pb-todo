import {
  CheckCircleOutlineOutlined,
  DeleteForeverOutlined,
  FiberManualRecordRounded,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { TodoContext } from "../utils/Contexts";

export default function SubTodoCard({ data, parId }: any) {
  const { markSubTodoCompleted, deleteSubTodo }: any = useContext(TodoContext);
  return (
    <Box sx={{ padding: 2 }}>
      {data?.subTodo?.map((item: any, index: Number) => {
        return (
          <Box key={index + "100"} sx={{ display: "flex", gap: "10px" }}>
            <FiberManualRecordRounded fontSize="small" />
            <Typography sx={{ color: "info.main" }}>{item.title}</Typography>
            {item.active ? (
              <CheckCircleOutlineOutlined
                fontSize="small"
                onClick={() => markSubTodoCompleted(parId, item.id)}
              />
            ) : (
              <DeleteForeverOutlined
                fontSize="small"
                onClick={() => deleteSubTodo(parId, item.id)}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
