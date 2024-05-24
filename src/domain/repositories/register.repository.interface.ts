import { Result } from "ts-results";
import AuthException from "../../core/exceptions/auth.exception";
import User from "../entity/user/user.entity";

export type RegisterOutput = {
    id: string;
}
export default interface IRegisterRepository {
    register(user: User): Promise<Result<RegisterOutput, AuthException>>;
}