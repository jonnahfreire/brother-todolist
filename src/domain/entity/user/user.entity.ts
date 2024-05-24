/* eslint-disable @typescript-eslint/no-explicit-any */
import Email from "../../value-objects/email";
import Id from "../../value-objects/id";
import Name from "../../value-objects/name";
import Password from "../../value-objects/password";

export default class User {
    private constructor(readonly id: Id, readonly name: Name, readonly email: Email, readonly password: Password) { }

    static create(name: string, email: string, password: string): User {
        return new User(Id.create(), new Name(name), new Email(email), Password.create(password));
    }

    static restore(id: string, name: string, email: string, password: string): User {
        return new User(Id.fromString(id), new Name(name), new Email(email), Password.create(password));
    }

    static fromJson(json: any): User {
        return User.restore(json.id, json.name, json.email, json.password);
    }

    static validatePassword(password: string): boolean {
        return Password.restore(password).compare(password);
    }
}