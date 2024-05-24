import { redirect } from "react-router-dom";
import { UserStorage } from "../../../core/storage/user.storage";

export const accessControllLoader = () => {
    const loggedUser = UserStorage.getLoggedUser();
    if (!loggedUser) {
        return redirect("/");
    }

    return null;
}