import IUsecase from "../../@shared/usecase/usecase.interface";
import ITasksRepository from "../../repositories/tasks.repository.interface";

export interface IDeleteTaskUsecase extends IUsecase<string, void> {
    execute(id: string): Promise<void>;
}

export default class DeleteTaskUsecase implements IDeleteTaskUsecase {
    constructor(private readonly tasksRepository: ITasksRepository) { }
    async execute(id: string): Promise<void> {
        await this.tasksRepository.delete(id);
    }
}