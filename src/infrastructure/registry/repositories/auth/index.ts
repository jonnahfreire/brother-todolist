import ILoginRepository from "../../../../domain/repositories/login.repository.interface";
import IRegisterRepository from "../../../../domain/repositories/register.repository.interface";
import LoginStorageRepository from "../../../repositories/login.storage.repository";
import RegisterStorageRepository from "../../../repositories/register.storage.repository";

import { ILoginDatasource } from "../../../datasources/auth/login.storage.datasource";
import { IRegisterDatasource } from "../../../datasources/auth/register.storage.datasource";
import { Registry, container } from "../../container-registry";

container.bind<ILoginRepository>(Registry.LoginRepository).toDynamicValue((context) => {
    const datasource = context.container.get<ILoginDatasource>(Registry.LoginDatasource);
    return new LoginStorageRepository(datasource);
});
container.bind<IRegisterRepository>(Registry.RegisterRepository).toDynamicValue((context) => {
    const datasource = context.container.get<IRegisterDatasource>(Registry.RegisterDatasource);
    return new RegisterStorageRepository(datasource);
});