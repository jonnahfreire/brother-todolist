/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthException from "../../../core/exceptions/auth.exception";
import { UserStorage } from "../../../core/storage/user.storage";
import { UserOutputDto } from "../../../domain/entity/user/user.dto";

export interface ILoginDatasource {
    getUser(email: string): Promise<UserOutputDto>;
}

export class LoginStorageDatasource implements ILoginDatasource {
    constructor() { }

    async getUser(email: string): Promise<UserOutputDto> {
        try {
            const user = await UserStorage.getStoredUser();
            if (!user || user.email !== email) throw new AuthException("Usuário não encontrado!");

            return Promise.resolve<UserOutputDto>({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            });

        } catch (error) {
            if (typeof error == 'string') throw new Error(error);
            if (error instanceof Error) throw new Error(error.message);
            if (error instanceof AuthException) throw new AuthException(error.message);
        }
        return Promise.reject("Ocorreu um erro inesperado!");
    }
}