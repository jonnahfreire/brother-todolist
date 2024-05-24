/* eslint-disable @typescript-eslint/no-explicit-any */
import { Err, Ok, Result } from "ts-results";
import { TaskOutputDto } from "../../domain/entity/task/task.dto";
import { ITaskDatasource } from "../datasources/task/task.storage.datasource";

import Task from "../../domain/entity/task/task.entity";
import ITasksRepository from "../../domain/repositories/tasks.repository.interface";
import TaskException from "../../core/exceptions/task.exception";

export default class TaskStorageRepository implements ITasksRepository {
    constructor(private readonly datasource: ITaskDatasource) { }
    async get(id: any): Promise<Task> {
        const task = await this.datasource.get(id);
        return Task.restore(task);
    }

    async getAll(): Promise<Task[]> {
        const tasks = await this.datasource.getTasks();
        return tasks.map(task => Task.restore({
            id: task.id,
            title: task.title,
            status: task.status
        }));
    }

    async create(task: Task): Promise<void> {
        await this.datasource.createTask({
            id: task.id,
            title: task.title,
            status: task.status
        });
    }

    async update(task: Task): Promise<void> {
        await this.datasource.updateTask({
            id: task.id,
            title: task.title,
            status: task.status
        });
    }

    async delete(id: any): Promise<void> {
        await this.datasource.deleteTask(id);
    }


    async getTasks(): Promise<Result<TaskOutputDto[], TaskException>> {
        try {
            const tasks = await this.datasource.getTasks();
            const domainTasks = tasks.map(task => Task.restore({ id: task.id, title: task.title, status: task.status }));
            return Ok(domainTasks);
        } catch (error) {
            if (typeof error == 'string') return Err(new TaskException(error));
            if (error instanceof Error) return Err(new Error(error.message));
            if (error instanceof TaskException) return Err(new TaskException(error.message));
            return Err(new Error(error as any));
        }
    }
}