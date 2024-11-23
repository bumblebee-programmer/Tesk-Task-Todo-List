import { Task } from "../types/TaskType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    fetchTasks: builder.query<Task[], void>({
      query: () => "tasks",
      providesTags: ["Task"],
    }),
    addTask: builder.mutation<void, { title: string; completed: boolean }>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation<void, Task>({
      query: (updatedTask) => ({
        url: `tasks/${updatedTask.id}`,
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
