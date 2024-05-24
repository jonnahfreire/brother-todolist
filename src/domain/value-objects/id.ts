export default class Id {
    private constructor(readonly value: string) { }

    static create(): Id {
        return new Id(crypto.randomUUID());
    }

    static fromString(value: string): Id {
        return new Id(value);
    }
}