/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthException from "../../../core/exceptions/auth.exception";
import { UserStorage } from "../../../core/storage/user.storage";

export interface IRegisterDatasource {
    register(id: string, name: string, email: string, password: string): Promise<{ id: string; }>;
}

export class RegisterStorageDatasource implements IRegisterDatasource {
    constructor() { }

    async register(id: string, name: string, email: string, password: string): Promise<{ id: string; }> {
        try {
            const user = await UserStorage.getStoredUser();
            if (user && user?.email === email) {
                throw new AuthException("Já existe um usuário com este email cadastrado!");
            }
            UserStorage.setStoredUser({ id, email, password, name });
            return Promise.resolve({ id });

        } catch (error) {
            if (typeof error == 'string') throw new Error(error);
            if (error instanceof Error) throw new Error(error.message);
            if (error instanceof AuthException) throw new AuthException(error.message);
        }
        return Promise.reject("Ocorreu um erro inesperado!");
    }
}