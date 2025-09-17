import {useEffect, useState} from "react";
import {getAllUsers} from "../../../features/api/userAction.ts";
import spinner from "../../../assets/spinner2.png";
import {useAppSelector} from "../../../app/hooks.ts";


interface AddressDto {
    city?: string;
    street?: string;
    houseNumber?: string;
    postalCode?: string;
}

interface OrderResponseDto {
    id: string;
    totalPrice: number;
}

interface UserDto {
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    address?: AddressDto | null;
    roles: string[];
    orders: OrderResponseDto[];
}

const UsersTable = () => {
    const {accessToken} = useAppSelector(state => state.userAuthSlice);
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!accessToken) return;
            try {
                const result = await getAllUsers(accessToken);
                setUsers(result);
            } catch (err) {
                console.error(err);
                setError("Failed to load users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [accessToken]);

    if (loading) {
        return (<div className="flex justify-center items-center w-full h-64">
            <img src={spinner} alt="loading..." className="spinner-icon"/>
        </div>)
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border border-gray-200 text-sm text-left text-gray-700">
                <caption className="text-lg font-semibold p-4 bg-gray-50 border-b border-gray-200">
                    List of clients
                </caption>
                <thead className="bg-lime-200 text-gray-800">
                <tr>
                    <th className="px-4 py-2 border">Login</th>
                    <th className="px-4 py-2 border">First name</th>
                    <th className="px-4 py-2 border">Last name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Address</th>
                    <th className="px-4 py-2 border">Roles</th>
                    <th className="px-4 py-2 border">Orders</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u.login} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{u.login}</td>
                        <td className="px-4 py-2 border">{u.firstName || "-"}</td>
                        <td className="px-4 py-2 border">{u.lastName || "-"}</td>
                        <td className="px-4 py-2 border">{u.email}</td>
                        <td className="px-4 py-2 border">
                            {u.address
                                ? `${u.address.city ?? ""}, ${u.address.street ?? ""} ${u.address.houseNumber ?? ""}, ${u.address.postalCode ?? ""}`
                                : <span className="text-gray-400 italic">No address</span>}
                        </td>
                        <td className="px-4 py-2 border">
                            {u.roles && u.roles.length > 0
                                ? u.roles.join(", ")
                                : <span className="text-gray-400 italic">No roles</span>}
                        </td>
                        <td className="px-4 py-2 border">
                            {u.orders && u.orders.length > 0
                                ? `${u.orders.length} orders`
                                : <span className="text-gray-400 italic">No orders</span>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
