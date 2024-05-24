import IRepository from "../@shared/repository/repository.interface";
import Task from "../entity/task/task.entity";

export default interface ITasksRepository extends IRepository<Task> {
}