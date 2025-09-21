import { createContext, type Dispatch, type SetStateAction } from "react";
import type {UserInterfaceAccount} from "./types"

interface UserContextType {
    users: UserInterfaceAccount[]; // <-- Тип изменен на UserInterfaceAccount[]
    setUsers: Dispatch<SetStateAction<UserInterfaceAccount[]>>; // <-- И здесь
}

export const UserContext = createContext<UserContextType>({
    users: [],
    setUsers: () => {},
});