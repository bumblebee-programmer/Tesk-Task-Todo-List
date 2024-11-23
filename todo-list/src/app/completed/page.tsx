"use client";

import { useFetchTasksQuery } from "@/entities/model/taskApi";

import { CircularProgress, Container, Typography } from "@mui/material";
import { List } from "@mui/material";
import { useMemo } from "react";
import styles from "./CompletedTasksPage.module.scss";
import { TaskItem } from "@/entities/ui";

const CompletedTasksPage = () => {
  const { data: tasks, isLoading } = useFetchTasksQuery();

  const completedTasks = useMemo(() => {
    return tasks?.filter((task) => task.completed);
  }, [tasks]);

  return (
    <Container>
      {isLoading ? (
        <CircularProgress
          sx={{ display: "block", margin: "auto", marginTop: "50%" }}
        />
      ) : completedTasks?.length ? (
        <>
          <Typography variant="h6" className={styles.pageTitle}>
            Выполненные задачи
          </Typography>
          <List>
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </List>
        </>
      ) : (
        <Typography variant="body1" className={styles.noTasksMessage}>
          Нет выполненных задач
        </Typography>
      )}
    </Container>
  );
};

export default CompletedTasksPage;
