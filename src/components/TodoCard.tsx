import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ToastContext, TodoContext } from "../utils/Contexts";
import {
  AddCircleOutlineRounded,
  ArrowDropDown,
  ArrowDropUp,
  CheckCircleOutlineOutlined,
  DeleteForeverOutlined,
} from "@mui/icons-material";
import SubTodoCard from "./SubTodoCard";

export default function TodoCard() {
  const { todo, markCompleted, activePage }: any = useContext(TodoContext);
  const { triggerModel }: any = useContext(ToastContext);
  const [todoExpand, setTodoExpand] = useState(null);
  return (
    <Container maxWidth="sm">
      {todo &&
        todo?.todos
          ?.filter((item: any) =>
            activePage === "Active"
              ? item.active
              : activePage === "Finished"
              ? !item.active
              : item
          )
          .map((item: any, index: any) => {
            return (
              <Box
                key={index}
                sx={{
                  padding: 2,
                  margin: 2,
                  borderBottom: "1px solid ",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {todoExpand === index ? (
                      <ArrowDropUp
                        onClick={() =>
                          todoExpand !== null
                            ? setTodoExpand(null)
                            : setTodoExpand(index)
                        }
                        fontSize="large"
                      />
                    ) : (
                      <ArrowDropDown
                        onClick={() =>
                          todoExpand !== null
                            ? setTodoExpand(null)
                            : setTodoExpand(index)
                        }
                        fontSize="large"
                      />
                    )}
                    <Box>
                      {
                        <Typography
                          style={{
                            textDecoration: item.active
                              ? "none"
                              : "line-through",
                          }}
                        >
                          {item.title}
                        </Typography>
                      }
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: "15px" }}>
                    <Tooltip title="Create SubTodo">
                      <IconButton
                        onClick={() =>
                          triggerModel("Create a SubTodo", "", false, item.id)
                        }
                      >
                        <AddCircleOutlineRounded />
                      </IconButton>
                    </Tooltip>

                    {item.active && (
                      <Tooltip title="Mark as Complte">
                        <IconButton onClick={() => markCompleted(item.id)}>
                          <CheckCircleOutlineOutlined />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete Todo">
                      <IconButton
                        onClick={() =>
                          triggerModel(
                            "Delete Todo",
                            "Are you sure want to delete",
                            true,
                            item.id
                          )
                        }
                      >
                        <DeleteForeverOutlined />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                {todoExpand === index && (
                  <SubTodoCard data={item} parId={item.id} />
                )}
              </Box>
            );
          })}
    </Container>
  );
}
