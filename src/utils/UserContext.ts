import React, {type Dispatch, type SetStateAction} from "react";
import type User from "../components/User.ts";


interface UserContext {
    users: User[];
    setUsers: Dispatch<SetStateAction<User[]>>
}

export const UserContext = React.createContext<UserContext>({users: [], setUsers: () => {}});