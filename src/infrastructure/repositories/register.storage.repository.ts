/* eslint-disable @typescript-eslint/no-explicit-any */
import { Err, Ok, Result } from "ts-results";

import AuthException from "../../core/exceptions/auth.exception";
import User from "../../domain/entity/user/user.entity";
import IRegisterRepository, { RegisterOutput } from "../../domain/repositories/register.repository.interface";
import { IRegisterDatasource } from "../datasources/auth/register.storage.datasource";

export default class RegisterStorageRepository implements IRegisterRepository {

    constructor(private readonly datasource: IRegisterDatasource) { }

    async register(user: User): Promise<Result<RegisterOutput, AuthException>> {
        try {
            const data = await this.datasource.register(
                user.id.value,
                user.name.value,
                user.email.value,
                user.password.value
            );

            return Ok(data);
        } catch (error) {
            if (typeof error == 'string') return Err(new AuthException(error));
            if (error instanceof Error) return Err(new Error(error.message));
            if (error instanceof AuthException) return Err(new AuthException(error.message));
            return Err(new Error(error as any));
        }
    }
}