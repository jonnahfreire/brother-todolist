import { Registry, container } from "../../container-registry";
import { ILoginDatasource, LoginStorageDatasource } from "../../../datasources/auth/login.storage.datasource";
import { IRegisterDatasource, RegisterStorageDatasource } from "../../../datasources/auth/register.storage.datasource";

container.bind<ILoginDatasource>(Registry.LoginDatasource).toConstantValue(new LoginStorageDatasource());
container.bind<IRegisterDatasource>(Registry.RegisterDatasource).toConstantValue(new RegisterStorageDatasource());