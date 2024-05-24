export default class TaskException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TaskException";
    }
}