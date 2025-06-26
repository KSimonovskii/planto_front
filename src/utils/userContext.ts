import React, {type Dispatch, type SetStateAction} from "react";
import type Users from "../components/Users.ts";


interface UserContext {
    users: Users[];
    setUsers: Dispatch<SetStateAction<Users[]>>
}

export const UserContext = React.createContext<UserContext>({users: [], setUsers: () => {}});