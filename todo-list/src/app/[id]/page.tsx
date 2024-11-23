"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  useFetchTasksQuery,
  useUpdateTaskMutation,
} from "@/entities/model/taskApi";
import { Task } from "../../entities/types/TaskType";
import styles from "./EditTaskPage.module.scss";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditTaskPage = ({ params }: PageProps) => {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );

  const { data: tasks, isLoading } = useFetchTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();

  useEffect(() => {
    params
      .then((result) => setResolvedParams(result))
      .catch((error) => {
        console.error("Ошибка получения параметров:", error);
      });
  }, [params]);

  const task = useMemo(() => {
    if (!resolvedParams || !tasks) return null;
    return tasks.find((task) => task.id === resolvedParams.id);
  }, [tasks, resolvedParams]);

  const handleSave = useCallback(
    async (data: { title: string }) => {
      if (!task) {
        console.error("Задача не найдена");
        return;
      }

      const updatedTask: Task = {
        ...task,
        title: data.title,
      };

      try {
        await updateTask(updatedTask).unwrap();
        router.push("/");
      } catch (error) {
        console.error("Ошибка при сохранении задачи:", error);
      }
    },
    [task, updateTask, router]
  );
  const handleCancel = useCallback(() => {
    router.push("/");
  }, [router]);

  if (!resolvedParams || isLoading) {
    return (
      <CircularProgress
        sx={{ display: "block", margin: "auto", marginTop: "50%" }}
      />
    );
  }

  if (!task) {
    return (
      <Typography variant="h6" className={styles.errorMessage}>
        Задача не найдена
      </Typography>
    );
  }

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit(handleSave)}
        className={styles.form}
      >
        <Controller
          name="title"
          control={control}
          defaultValue={task.title}
          rules={{
            required: "Название задачи не может быть пустым",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Название задачи"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Box className={styles.buttons}>
          <Button type="submit" variant="outlined" color="primary">
            Сохранить
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Отменить
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditTaskPage;
