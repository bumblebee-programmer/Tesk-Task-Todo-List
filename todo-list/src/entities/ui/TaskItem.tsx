"use client";

import { Task } from "../types/TaskType";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../model/taskApi";
import styles from "./TaskItem.module.scss";
import { memo, useCallback } from "react";

interface TaskItemProps {
  task: Task;
}

const TaskItem = memo(({ task }: TaskItemProps) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const router = useRouter();
  const handleEditClick = useCallback(() => {
    router.push(`/${task.id}`);
  }, [router, task.id]);

  const handleCheckboxChange = useCallback(async () => {
    try {
      await updateTask({ ...task, completed: !task.completed });
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
    }
  }, [task, updateTask]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  return (
    <ListItem
      className={styles.listItem}
      secondaryAction={
        <IconButton edge="end" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <IconButton onClick={handleEditClick} className={styles.editButton}>
        <EditIcon />
      </IconButton>
      <Checkbox checked={task.completed} onChange={handleCheckboxChange} />
      <ListItemText
        primary={task.title}
        className={`${styles.text} ${task.completed ? styles.completed : ""}`}
      />
    </ListItem>
  );
});

export default TaskItem;
