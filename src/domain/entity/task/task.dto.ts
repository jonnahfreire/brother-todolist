import { TaskStatus } from "../../enums/task-status.enum";

export type TaskInputDto = {
    title: string;
}

export type TaskOutputDto = {
    id: string;
    title: string
    status: TaskStatus;
}