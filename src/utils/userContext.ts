import React, {type Dispatch, type SetStateAction} from "react";
import type UserAccount from "../components/UserAccount.ts";


interface UserContext {
    users: UserAccount[];
    setUsers: Dispatch<SetStateAction<UserAccount[]>>
}

export const UserContext = React.createContext<UserContext>({users: [], setUsers: () => {}});