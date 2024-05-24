import ILoginRepository from "../../../../domain/repositories/login.repository.interface";
import IRegisterRepository from "../../../../domain/repositories/register.repository.interface";
import LoginUsecase, { ILoginUsecase } from "../../../../domain/usecases/auth/login/login.usecase";
import RegisterUsecase, { IRegisterUsecase } from "../../../../domain/usecases/auth/register/register.usecase";
import { Registry, container } from "../../container-registry";

container.bind<ILoginUsecase>(Registry.LoginUsecase).toDynamicValue((context) => {
    const repo = context.container.get<ILoginRepository>(Registry.LoginRepository);
    return new LoginUsecase(repo);
});

container.bind<IRegisterUsecase>(Registry.RegisterUsecase).toDynamicValue((context) => {
    const repo = context.container.get<IRegisterRepository>(Registry.RegisterRepository);
    return new RegisterUsecase(repo);
});