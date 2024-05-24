import { useEffect, useRef } from "react";
import { createContext, useState } from "react";
import { Registry, container } from "../../../../infrastructure/registry";
import { ICreateTaskUsecase } from "../../../../domain/usecases/task/create-task.usecase";
import { IGetTasksUsecase } from "../../../../domain/usecases/task/get-tasks.usecase";
import { IUpdateTaskUsecase } from "../../../../domain/usecases/task/update-task.usecase";
import { IDeleteTaskUsecase } from "../../../../domain/usecases/task/delete-task.usecase";
import Task from "../../../../domain/entity/task/task.entity";

interface TaskContextData {
  tasks: Task[];
  tasksDone: number;
  tasksTodo: number;
  creationError?: { message: string };
  creationSuccess: boolean;
  setCreationSuccess: (value: boolean) => void;
  getTasks: () => void;
  createTask: (task: string) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextData>(
  {} as TaskContextData
);

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [creationError, setCreationError] = useState<{ message: string }>();
  const [creationSuccess, setCreationSuccess] = useState<boolean>(false);

  const tasksDone = tasks.filter((t) => t.isDone).length;
  const tasksTodo = tasks.length - tasksDone;

  useEffect(() => {
    getTasks();
  }, []);

  async function createTask(task: string): Promise<void> {
    const createTaskUsecase = container.get<ICreateTaskUsecase>(
      Registry.CreateTaskUsecase
    );

    try {
      await createTaskUsecase.execute(task);
      await getTasks();
      setCreationSuccess(true);
      setTimeout(() => setCreationSuccess(false), 4000);
    } catch (error: any) {
      setCreationError({ message: error.message });
      setTimeout(() => setCreationError(undefined), 4000);
    }
  }

  async function getTasks() {
    const getTasksUsecase = container.get<IGetTasksUsecase>(
      Registry.GetTasksUsecase
    );
    const response = await getTasksUsecase.execute();
    setTasks(response);
  }

  async function updateTask(task: Task): Promise<void> {
    const updateTasksUsecase = container.get<IUpdateTaskUsecase>(
      Registry.UpdateTaskUsecase
    );
    await updateTasksUsecase.execute(task);
    await getTasks();
  }

  async function deleteTask(id: string): Promise<void> {
    const deleteTasksUsecase = container.get<IDeleteTaskUsecase>(
      Registry.DeleteTaskUsecase
    );
    await deleteTasksUsecase.execute(id);
    await getTasks();
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        tasksDone,
        tasksTodo,
        creationError,
        creationSuccess,
        setCreationSuccess,
        createTask,
        updateTask,
        deleteTask,
        getTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
