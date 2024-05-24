/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStorage } from "./storage.interface";

export abstract class TaskStorage extends IStorage {
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
        TaskStorage.removeItem("@todolists");
    }

    static setStoredTasks(tasks: any) {
        TaskStorage.setItem("@todolists", JSON.stringify(tasks));
    }

    static getStoredTasks() {
        const tasks = TaskStorage.getItem("@todolists");
        if (tasks) {
            return JSON.parse(tasks);
        }
        return null;
    }
}