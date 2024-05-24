import AuthException from "../../core/exceptions/auth.exception";

export default class Email {
    constructor(readonly value: string) {
        if (!String(this.value).toLowerCase().match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)) {
            throw new AuthException("E-mail inválido");
        }
    }
}