import UsersTable from "./UsersTable.tsx";
import {UserContext} from "../../../utils/userContext.ts";
import {useEffect, useState} from "react";
import {getUsersTable} from "../../../features/hooks/useUserAction.ts";
import type {UserInterfaceAccount} from "../../../utils/types";

const UsersManager = () => {
    const [users, setUsers] = useState<UserInterfaceAccount[]>([]);

    //TODO - implement users RTK query

    useEffect(() => {
        const fetchAndSetUsers = async () => {
            try {
                const fetchedUsers = await getUsersTable();
                setUsers(fetchedUsers);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };

        fetchAndSetUsers();
    }, []);

    return (
        <div className={"col-span-6"}>
            <UserContext.Provider value={{users, setUsers}}>
                <UsersTable/>
            </UserContext.Provider>
        </div>
    )

}
export default UsersManager