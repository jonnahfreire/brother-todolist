import { useRef, useState } from "react";

import { EmptyTasksInfo } from "../../shared/components/Task/EmptyTasksInfo";

import { TasksInfo } from "../../shared/components/Task/TasksInfo";
import { TaskWidget } from "../../shared/components/Task/TaskWidget";
import { ErrorToastDialog, ToastDialog } from "../../shared/utils/Utilities";
import { useTask } from "../../shared/hooks/useTask";
import {
  Button,
  Content,
  Input,
  InputContainer,
  TaskListWrapper,
  Wrapper,
} from "./components";
import { AppHeader } from "../../shared/components/Header";
import { useAuth } from "../../shared/hooks/useAuth";

export const Home = () => {
  const {
    tasks,
    tasksDone,
    tasksTodo,
    creationError,
    creationSuccess,
    setCreationSuccess,
    createTask,
    updateTask,
    deleteTask,
  } = useTask();
  const { logout } = useAuth();

  const [task, setTask] = useState<string>();
  const timerRef = useRef(0);

  function handleChangeToast() {
    timerRef.current = window.setTimeout(() => {
      setCreationSuccess(false);
    }, 100);

    return () => clearTimeout(timerRef.current);
  }

  function create() {
    createTask(task ?? "");
    setTask("");
  }

  return (
    <>
      <AppHeader showLogout={true} onLogout={logout} />
      <Wrapper style={{ marginTop: 80 }}>
        <Content>
          <InputContainer>
            <Input
              placeholder="Descreva a tarefa aqui"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button onClick={create}>Criar tarefa</Button>
          </InputContainer>

          <TasksInfo todo={tasksTodo} done={tasksDone} total={tasks.length} />

          {!tasks?.length && <EmptyTasksInfo />}
          <TaskListWrapper>
            {tasks?.map((task) => {
              return (
                <TaskWidget
                  key={task.id}
                  task={task}
                  actions={{ save: updateTask, delete: deleteTask }}
                />
              );
            })}
          </TaskListWrapper>

          {creationSuccess && (
            <ToastDialog
              isOpen={creationSuccess}
              handleOpen={handleChangeToast}
              handleClose={handleChangeToast}
            />
          )}

          {creationError && (
            <ErrorToastDialog
              isOpen={creationError !== undefined}
              description={creationError.message}
              handleOpen={handleChangeToast}
              handleClose={handleChangeToast}
            />
          )}
        </Content>
      </Wrapper>
    </>
  );
};
