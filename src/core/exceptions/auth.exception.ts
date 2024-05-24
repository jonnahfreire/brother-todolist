export default class AuthException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthException";
    }
}