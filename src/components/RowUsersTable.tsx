import type User from "./User.ts";
import {UserContext} from "../utils/UserContext.ts";
import {useContext} from "react";
import {getUser, removeUserFromTable} from "../features/api/UserAction.ts";

interface PropsUser {
    user: User,
}

const RowUsersTable = (props: PropsUser) => {

    const {users, setUsers} = useContext(UserContext);
    const user = props.user;

    const editUser = (login: string) => {
        const index = users.findIndex((user) => user.login === login);
        if (index >= 0)
            return true;
    }

    const removeUser = async (login: string) => {
        const res = await removeUserFromTable(login);
        if (res) {
            setUsers(await getUser(login));
        }
    }

    return (
        <tr className={"hover:bg-[#eec3a9] hover:text-[#cd663d]"}>
            <th className={"font-normal w-70"}>{user.login}</th>
            <th className={"font-normal w-70"}>{user.firstName}</th>
            <th className={"font-normal w-70"}>{user.lastName}</th>
            <th className={"font-normal w-70"}>{user.email}</th>
            <th className={"font-normal w-70"}>{user.address}</th>
            <th className={"font-normal w-70"}>{user.role}</th>
            <th className={"font-normal w-70"}>{user.orders}</th>
            <th className={"w-5 flex flex-row flex-nowrap justify-around items-center"}>
                <img src={"./src/assets/edit.jpg"} alt={"Edit"} className={"w-5"}
                     onClick={() => editUser(user.login)}></img>
                <img src={"./src/assets/delete.jpg"} alt={"Delete"} onClick={() => removeUser(user.login)}
                     className={"w-5"}></img>
            </th>
        </tr>
    )
}

export default RowUsersTable