import { UserInputDto } from "../../../entity/user/user.dto";
import IUsecase from "../../../@shared/usecase/usecase.interface";
import User from "../../../entity/user/user.entity";

import IRegisterRepository from "../../../repositories/register.repository.interface";

export interface IRegisterUsecase extends IUsecase<UserInputDto, void> {
    execute(user: UserInputDto): Promise<void>;
}

export default class RegisterUsecase implements IRegisterUsecase {
    constructor(private readonly repository: IRegisterRepository) { }

    async execute(user: UserInputDto): Promise<void> {
        const userInput = User.create(user.name, user.email, user.password);
        const data = await this.repository.register(userInput);
        if (data.ok) {
            return Promise.resolve();
        }
        return Promise.reject(data.val);
    }
}