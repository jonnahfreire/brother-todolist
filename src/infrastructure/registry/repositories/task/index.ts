import { Registry, container } from "../../container-registry";
import ITasksRepository from "../../../../domain/repositories/tasks.repository.interface";
import TaskStorageRepository from "../../../repositories/tasks.storage.repository";
import { ITaskDatasource } from "../../../datasources/task/task.storage.datasource";

container.bind<ITasksRepository>(Registry.TasksRepository).toDynamicValue((context) => {
    const datasource = context.container.get<ITaskDatasource>(Registry.TasksDatasource);
    return new TaskStorageRepository(datasource);
});