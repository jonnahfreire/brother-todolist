import { MutableRefObject } from "react";
import { UserOutputDto } from "../../../../domain/entity/user/user.dto";

export interface IUser extends UserOutputDto { }
export interface IAuthenticationError {
    message: string;
}

export interface IAuthContext {
    user: IUser | null;
    isLoading: boolean;
    authenticationError: IAuthenticationError | undefined;
    registrationError: IAuthenticationError | undefined;
    registerSuccess?: boolean;
    loginData: MutableRefObject<{ email: string; password: string; }>
    registerData: MutableRefObject<{ name: string; email: string; password: string }>
    setLoginData({
        email,
        password,
    }: {
        email?: string;
        password?: string;
    }): void;
    setRegisterData({
        name,
        email,
        password,
    }: {
        name?: string;
        email?: string;
        password?: string;
    }): void;
    authenticate(): Promise<void>;
    register(): Promise<void>;
    logout(): void;
}

export interface IAuthProvider {
    children: JSX.Element;
}