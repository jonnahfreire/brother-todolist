import IUsecase from "../../@shared/usecase/usecase.interface";
import Task from "../../entity/task/task.entity";
import ITasksRepository from "../../repositories/tasks.repository.interface";

export interface IGetTasksUsecase extends IUsecase<void, Task[]> {
    execute(): Promise<Task[]>;
}

export default class GetTasksUsecase implements IGetTasksUsecase {
    constructor(private readonly tasksRepository: ITasksRepository) { }
    async execute(): Promise<Task[]> {
        const data = await this.tasksRepository.getAll();
        return Promise.resolve(data);
    }
}