/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStorage } from "./storage.interface";

export abstract class UserStorage extends IStorage {
    private static setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    private static getItem(key: string) {
        return localStorage.getItem(key);
    }

    private static removeItem(key: string) {
        localStorage.removeItem(key);
    }

    static clear() {
        UserStorage.removeItem("@todolist-user");
    }

    static setIsLogged(value: boolean) {
        UserStorage.setItem("@isLogged", JSON.stringify(value));
    }

    static getLoggedUser() {
        const logged = UserStorage.getItem("@isLogged");
        if (logged) {
            return JSON.parse(logged);
        }
        return false;
    }

    static setStoredUser(user: any) {
        UserStorage.setItem("@todolist-user", JSON.stringify(user));
    }

    static getStoredUser() {
        const user = UserStorage.getItem("@todolist-user");
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    static getEmail() {
        return UserStorage.getItem("@email");
    }
}