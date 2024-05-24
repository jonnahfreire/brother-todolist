import { Registry, container } from "../../container-registry";
import { ITaskDatasource, TaskStorageDatasource } from "../../../datasources/task/task.storage.datasource";

container.bind<ITaskDatasource>(Registry.TasksDatasource).toConstantValue(new TaskStorageDatasource());