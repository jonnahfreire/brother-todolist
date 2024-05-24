/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useRef, useState } from "react";
import {
  IAuthContext,
  IAuthProvider,
  IAuthenticationError,
  IUser,
} from "./types";
import { useNavigate } from "react-router-dom";
import { UserStorage } from "../../../../core/storage/user.storage";

import ILoginUsecase from "../../../../domain/usecases/auth/login/login.usecase";
import { IRegisterUsecase } from "../../../../domain/usecases/auth/register/register.usecase";
import { Registry, container } from "../../../../infrastructure/registry";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [authenticationError, setAuthenticationError] = useState<
    IAuthenticationError | undefined
  >();
  const [registrationError, setRegistrationError] = useState<
    IAuthenticationError | undefined
  >();

  const navigate = useNavigate();

  const loginData = useRef<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const registerData = useRef<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setAuthenticationError(undefined);
    setRegistrationError(undefined);
    setUser(null);

    const storedUser = UserStorage.getStoredUser();
    if (storedUser) setUser(storedUser);
  }, []);

  async function authenticate(): Promise<void> {
    setIsLoading(true);
    try {
      const loginUsecase: ILoginUsecase = container.get<ILoginUsecase>(
        Registry.LoginUsecase
      );

      const loggedUser = await loginUsecase.execute({
        email: loginData.current.email,
        password: loginData.current.password,
      });

      if (loggedUser) {
        setUser(loggedUser);
      }

      setIsLoading(false);
      if (!loggedUser) {
        throw new Error("Usuário não encontrado!");
      }

      UserStorage.setIsLogged(true);
      navigate("/home", { replace: true });
    } catch (error: any) {
      setAuthenticationError({ message: error.message });
      setTimeout(() => setAuthenticationError(undefined), 4000);
    }
    setIsLoading(false);
  }

  async function register(): Promise<void> {
    setIsLoading(true);
    try {
      const registerUsecase: IRegisterUsecase = container.get<IRegisterUsecase>(
        Registry.RegisterUsecase
      );

      await registerUsecase.execute({
        name: registerData.current.name,
        email: registerData.current.email,
        password: registerData.current.password,
      });

      setIsLoading(false);
      setRegisterSuccess(true);

      setTimeout(() => {
        setRegisterSuccess(false);
        navigate("/", { replace: true });
      }, 5000);
    } catch (error: any) {
      setRegistrationError({ message: error.message });
      setTimeout(() => setRegistrationError(undefined), 4000);
    }
    setIsLoading(false);
  }

  function setLoginData({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }) {
    loginData.current.email = email || "";
    loginData.current.password = password || "";
  }

  function setRegisterData({
    name,
    email,
    password,
  }: {
    name?: string;
    email?: string;
    password?: string;
  }) {
    registerData.current.name = name || "";
    registerData.current.email = email || "";
    registerData.current.password = password || "";
  }

  function logout() {
    setUser(null);
    UserStorage.setIsLogged(false);
    navigate("/", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginData,
        registerData,
        isLoading,
        authenticationError,
        registrationError,
        registerSuccess,
        setLoginData,
        setRegisterData,
        authenticate,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
