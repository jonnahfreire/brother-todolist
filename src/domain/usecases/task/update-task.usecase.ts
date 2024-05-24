import IUsecase from "../../@shared/usecase/usecase.interface";
import Task from "../../entity/task/task.entity";
import ITasksRepository from "../../repositories/tasks.repository.interface";

export interface IUpdateTaskUsecase extends IUsecase<Task, void> {
    execute(task: Task): Promise<void>;
}

export default class UpdateTaskUsecase implements IUpdateTaskUsecase {
    constructor(private readonly tasksRepository: ITasksRepository) { }
    async execute(task: Task): Promise<void> {
        await this.tasksRepository.update(task);
    }
}