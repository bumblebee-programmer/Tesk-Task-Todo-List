"use client";

import { CircularProgress, Container, List } from "@mui/material";

import { useFetchTasksQuery } from "../model/taskApi";
import AddTaskForm from "@/features/add-task/ui";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { data: tasks, isLoading } = useFetchTasksQuery();

  return (
    <Container>
      {isLoading ? (
        <CircularProgress
          style={{ display: "block", margin: "auto", marginTop: "50%" }}
        />
      ) : (
        <>
          <AddTaskForm />
          <List>
            {tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default TaskList;
