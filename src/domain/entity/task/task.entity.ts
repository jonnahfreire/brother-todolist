import { TaskStatus } from "../../enums/task-status.enum";

export default class Task {
    private _id: string;
    private _title: string;
    private _status: TaskStatus;
    private constructor(
        id: string,
        title: string,
        status: TaskStatus,
    ) {
        this._id = id;
        this._title = title;
        this._status = status;

        if (!this._title) throw new Error("Nome da tarefa não pode ser vazio");
    }

    static create(title: string) {
        const id = Math.random().toString(36).toLowerCase();
        return new Task(id, title, TaskStatus.Pending);
    }

    static restore(source: any) {
        return new Task(source.id, source.title, source.status);
    }

    public get isPending(): boolean {
        return this._status === TaskStatus.Pending;
    }

    public get isDone(): boolean {
        return this._status === TaskStatus.Done;
    }

    public setAsDone() {
        this._status = TaskStatus.Done;
    }

    public setAsPending() {
        this._status = TaskStatus.Pending;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get title() {
        return this._title;
    }

    public get id() {
        return this._id;
    }

    public get status() {
        return this._status;
    }
}