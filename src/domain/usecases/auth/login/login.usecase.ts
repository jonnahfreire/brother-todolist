import IUsecase from "../../../@shared/usecase/usecase.interface";
import { UserInputDto, UserOutputDto } from "../../../entity/user/user.dto";

import ILoginRepository from "../../../repositories/login.repository.interface";

type LoginInput = Omit<UserInputDto, "name">;

export interface ILoginUsecase extends IUsecase<LoginInput, UserOutputDto> {
    execute(user: LoginInput): Promise<UserOutputDto>;
}

export default class LoginUsecase implements ILoginUsecase {
    constructor(private readonly repository: ILoginRepository) { }

    async execute(user: LoginInput): Promise<UserOutputDto> {
        const data = await this.repository.login(user);
        if (data.ok) {
            return Promise.resolve(data.val);
        }
        return Promise.reject(data.val);
    }
}