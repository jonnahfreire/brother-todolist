import IUsecase from "../../@shared/usecase/usecase.interface";
import Task from "../../entity/task/task.entity";
import ITasksRepository from "../../repositories/tasks.repository.interface";

export interface ICreateTaskUsecase extends IUsecase<string, void> {
    execute(title: string): Promise<void>;
}

export default class CreateTaskUsecase implements ICreateTaskUsecase {
    constructor(private readonly tasksRepository: ITasksRepository) { }
    async execute(title: string): Promise<void> {
        const task = Task.create(title);
        await this.tasksRepository.create(task);
    }
}