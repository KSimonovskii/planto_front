import UsersTable from "../personalAccount/UsersTable.tsx";
import {UserContext} from "../../../utils/userContext.ts";
import {useEffect, useState} from "react";
import type UserAccount from "./UserAccount.ts";
import {getUsersTable} from "../../../features/api/userAction.ts";

const UsersManager = () => {
    const [users, setUsers] = useState<UserAccount[]>([]);

    useEffect(() => {

        const getAllUsers = async () => {
            try {
                const result = await getUsersTable();
                setUsers(result);
            } catch (err) {
                console.error(err)
            }
        }

        getAllUsers();
    }, [])

    return (
        <div className={"col-span-6"}>
            <UserContext.Provider value={{users, setUsers}}>
                <UsersTable/>
            </UserContext.Provider>
        </div>
    )

}
export default UsersManager