export default interface IUsecase<Input, Output> {
    execute(input: Input): Promise<Output>;
}