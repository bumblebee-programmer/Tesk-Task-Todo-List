"use client";

import { useForm } from "react-hook-form";

import { Button, TextField, Box, Container } from "@mui/material";

import { memo, useCallback } from "react";
import { useAddTaskMutation } from "@/entities/model/taskApi";

interface TaskFormData {
  title: string;
}
//React
const AddTaskForm = memo(() => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();
  const [addTask, { isLoading }] = useAddTaskMutation();

  const onSubmit = useCallback(
    async (data: TaskFormData) => {
      try {
        await addTask({ ...data, completed: false }).unwrap();
        reset();
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    },
    [addTask, reset]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", gap: 2, marginBottom: 4 }}
    >
      <TextField
        label="Новая задача"
        variant="outlined"
        fullWidth
        {...register("title", { required: "Название задачи обязательно" })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        Добавить
      </Button>
    </Box>
  );
});

export default AddTaskForm;
