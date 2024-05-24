import { Container } from "inversify";

export const Registry = {
    LoginUsecase: Symbol.for("LoginUsecase"),
    RegisterUsecase: Symbol.for("RegisterUsecase"),
    LoginRepository: Symbol.for("LoginRepository"),
    RegisterRepository: Symbol.for("RegisterRepository"),
    LoginDatasource: Symbol.for("LoginDatasource"),
    RegisterDatasource: Symbol.for("RegisterDatasource"),

    CreateTaskUsecase: Symbol.for("CreateTaskUsecase"),
    GetTasksUsecase: Symbol.for("GetTasksUsecase"),
    UpdateTaskUsecase: Symbol.for("UpdateTaskUsecase"),
    DeleteTaskUsecase: Symbol.for("DeleteTaskUsecase"),

    TasksRepository: Symbol.for("TasksRepository"),
    TasksDatasource: Symbol.for("TasksDatasource"),
}

export const container = new Container();