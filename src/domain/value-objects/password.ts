import AuthException from "../../core/exceptions/auth.exception";

export default class Password {
    private constructor(readonly value: string) { }

    static create(value: string): Password {
        if (value == undefined || value.length == 0) {
            throw new AuthException("Informe uma senha válida");
        }
        if (value.length < 8) {
            throw new AuthException("A senha deve conter pelo menos 8 caracteres");
        }

        return new Password(value);
    }

    static restore(value: string): Password {
        return new Password(value);
    }

    compare(value: string): boolean {
        return value == this.value;
    }
}