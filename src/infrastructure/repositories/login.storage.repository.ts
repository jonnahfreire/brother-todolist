/* eslint-disable @typescript-eslint/no-explicit-any */
import { Err, Ok, Result } from "ts-results";
import { UserOutputDto } from "../../domain/entity/user/user.dto";
import { ILoginDatasource } from "../datasources/auth/login.storage.datasource";

import ILoginRepository, { RepositoryLoginInput } from "../../domain/repositories/login.repository.interface";
import AuthException from "../../core/exceptions/auth.exception";
import User from "../../domain/entity/user/user.entity";

export default class LoginStorageRepository implements ILoginRepository {
    constructor(private readonly datasource: ILoginDatasource) { }

    async login(user: RepositoryLoginInput): Promise<Result<UserOutputDto, AuthException>> {
        try {
            const data = await this.datasource.getUser(user.email);
            const { password } = user;
            const domainUser = User.restore(data.id, data.name, data.email, data.password);
            if (!domainUser.password.compare(password)) throw new AuthException("Senha incorreta!");
            return Ok(data);
        } catch (error) {
            if (typeof error == 'string') return Err(new AuthException(error));
            if (error instanceof Error) return Err(new Error(error.message));
            if (error instanceof AuthException) return Err(new AuthException(error.message));
            return Err(new Error(error as any));
        }
    }
}