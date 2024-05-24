import { Result } from "ts-results";
import { UserInputDto, UserOutputDto } from "../entity/user/user.dto";
import AuthException from "../../core/exceptions/auth.exception";

export type RepositoryLoginInput = Omit<UserInputDto, "name">;
export default interface ILoginRepository {
    login(user: RepositoryLoginInput): Promise<Result<UserOutputDto, AuthException>>;
}