import { Registry, container } from "../../container-registry";
import ITasksRepository from "../../../../domain/repositories/tasks.repository.interface";
import GetTasksUsecase, { IGetTasksUsecase } from "../../../../domain/usecases/task/get-tasks.usecase";
import CreateTaskUsecase, { ICreateTaskUsecase } from "../../../../domain/usecases/task/create-task.usecase";
import UpdateTaskUsecase, { IUpdateTaskUsecase } from "../../../../domain/usecases/task/update-task.usecase";
import DeleteTaskUsecase, { IDeleteTaskUsecase } from "../../../../domain/usecases/task/delete-task.usecase";

container.bind<ICreateTaskUsecase>(Registry.CreateTaskUsecase).toDynamicValue((context) => {
    const repo = context.container.get<ITasksRepository>(Registry.TasksRepository);
    return new CreateTaskUsecase(repo);
});

container.bind<IGetTasksUsecase>(Registry.GetTasksUsecase).toDynamicValue((context) => {
    const repo = context.container.get<ITasksRepository>(Registry.TasksRepository);
    return new GetTasksUsecase(repo);
});

container.bind<IUpdateTaskUsecase>(Registry.UpdateTaskUsecase).toDynamicValue((context) => {
    const repo = context.container.get<ITasksRepository>(Registry.TasksRepository);
    return new UpdateTaskUsecase(repo);
});

container.bind<IDeleteTaskUsecase>(Registry.DeleteTaskUsecase).toDynamicValue((context) => {
    const repo = context.container.get<ITasksRepository>(Registry.TasksRepository);
    return new DeleteTaskUsecase(repo);
});