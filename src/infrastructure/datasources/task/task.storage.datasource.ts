/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthException from "../../../core/exceptions/auth.exception";
import { TaskStorage } from "../../../core/storage/task.storage";
import { TaskOutputDto } from "../../../domain/entity/task/task.dto";

export interface ITaskDatasource {
    get(id: string): Promise<TaskOutputDto>;
    getTasks(): Promise<TaskOutputDto[]>;
    createTask(task: any): Promise<void>;
    updateTask(task: any): Promise<void>;
    deleteTask(id: any): Promise<void>;
}

export class TaskStorageDatasource implements ITaskDatasource {
    constructor() { }
    async deleteTask(id: any): Promise<void> {
        let tasks = await TaskStorage.getStoredTasks();
        if (!tasks) {
            return;
        }
        const updatedTasks = tasks.filter((t: any) => t.id !== id);
        TaskStorage.setStoredTasks(updatedTasks);
    }

    async get(id: string): Promise<TaskOutputDto> {
        let tasks = await TaskStorage.getStoredTasks();
        if (!tasks) {
            throw new Error("Tarefa não encontrada");
        }

        return tasks.find((t: any) => t.id === id);
    }

    async updateTask(task: any): Promise<void> {
        let tasks = await TaskStorage.getStoredTasks();
        if (!tasks) {
            return;
        }

        const updatedTasks = tasks.map((t: any) => {
            if (t.id === task.id) t = task;
            return t;
        });
        TaskStorage.setStoredTasks(updatedTasks);
    }

    async createTask(task: any): Promise<void> {
        let tasks = await TaskStorage.getStoredTasks();
        if (!tasks) { tasks = []; }
        TaskStorage.setStoredTasks([...tasks, task]);
    }

    async getTasks(): Promise<TaskOutputDto[]> {
        try {
            const tasks = await TaskStorage.getStoredTasks();
            if (!tasks) return [];

            return Promise.resolve<TaskOutputDto[]>(tasks);
        } catch (error) {
            if (typeof error == 'string') throw new Error(error);
            if (error instanceof Error) throw new Error(error.message);
            if (error instanceof AuthException) throw new AuthException(error.message);
        }
        return Promise.reject("Ocorreu um erro inesperado!");
    }
}