import {useEffect, useState} from "react";
import {useAppSelector} from "../../../app/hooks.ts";
import {getUsersTable, useUserActions} from "../../../features/hooks/useUserAction.ts";
import type { UserInterfaceAccount } from "../../../utils/types";
import SpinnerFlower from "../../../assets/SpinnerFlower.tsx";

const columnsConfig = [
    {
        key: "login",
        header: "Login",
        width: "w-1/12",
        render: (user: UserInterfaceAccount) => user.login,
    },
    {
        key: "firstName",
        header: "First name",
        width: "w-1/12",
        render: (user: UserInterfaceAccount) => user.firstName || "-",
    },
    {
        key: "lastName",
        header: "Last name",
        width: "w-1/12",
        render: (user: UserInterfaceAccount) => user.lastName || "-",
    },
    {
        key: "email",
        header: "Email",
        width: "w-2/12",
        render: (user: UserInterfaceAccount) => user.email,
    },
    {
        key: "address",
        header: "Address",
        width: "w-2/12",
        render: (user: UserInterfaceAccount) => user.address
            ? `${user.address.city ?? ""}, ${user.address.street ?? ""} ${user.address.houseNumber ?? ""}, ${user.address.postalCode ?? ""}`
            : <span className="text-gray-400 italic">No address</span>
    },
    {
        key: "orders",
        header: "Orders",
        width: "w-1/12",
        render: (user: UserInterfaceAccount, expanded: boolean) => {
            const orderCount = user.orders ? user.orders.length : 0;
            return orderCount > 0
                ? <div className="flex items-center justify-between">
                    <span>{orderCount} order{orderCount > 1 ? 's' : ''}</span>
                    <span className="ml-2 transform transition-transform duration-200">
                                             <svg xmlns="http://www.w3.org/2000/svg"
                                                  className={`h-4 w-4 ${expanded ? 'rotate-180' : 'rotate-0'}`}
                                                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </div>
                : <span className="text-gray-400 italic">No orders</span>
        },
    },
    {
        key: "roles",
        header: "Roles",
        width: "w-1/12",
        render: (user: UserInterfaceAccount) => user.roles && user.roles.length > 0
            ? user.roles.join(", ")
            : <span className="text-gray-400 italic">No roles</span>
    },
];

const UsersTable = () => {
    const {accessToken} = useAppSelector(state => state.userAuthSlice);
    const [users, setUsers] = useState<UserInterfaceAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
    const [loadingOrders, setLoadingOrders] = useState<string | null>(null);
    const {getUserByLogin} = useUserActions();

    const toggleExpand = async (login: string) => {
        if (expandedUser === login) {
            setExpandedUser(null);
            return;
        }

        const user = users.find(u => u.login === login);
        if (user && (!user.orders || user.orders.length === 0)) {
            try {
                setLoadingOrders(login);
                const freshUser = await getUserByLogin(login);
                setUsers(prev =>
                    prev.map(u => (u.login === login ? {...u, orders: freshUser.orders} : u))
                );
            } catch (err) {
                console.error("Failed to load orders for user", login, err);
            } finally {
                setLoadingOrders(null);
            }
        }
        setExpandedUser(login);
    };


    useEffect(() => {
        const fetchUsers = async () => {
            if (!accessToken) return;
            try {
                const result = await getUsersTable();

                console.log("await getUsersTable() for UsersTable -->", result);

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
        return ( <SpinnerFlower/>)
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-fixed border border-gray-200 text-sm text-left text-gray-700">
                <caption className="text-lg font-semibold p-4 bg-gray-50 border-b border-gray-200">
                    List of clients
                </caption>
                <thead className="bg-lime-200 text-gray-800">
                <tr>
                    {columnsConfig.map((column) => (
                        <th key={column.key} className={`px-4 py-2 border ${column.width}`}>{column.header}</th>
                    ))}
                </tr>
                </thead>
                {users.map((u) => (
                    <tbody key={u.login} className="align-top">
                    <tr className="hover:bg-gray-50">
                        {columnsConfig.map((column) => (
                            <td
                                key={column.key}
                                className={`px-4 py-2 border ${column.width} ${column.key === 'orders' && (u.orders?.length ?? 0) > 0 ? 'cursor-pointer hover:font-bold' : ''}`}
                                onClick={column.key === 'orders' && (u.orders?.length ?? 0) > 0 ? () => toggleExpand(u.login) : undefined}
                            >
                                {column.render(u, expandedUser === u.login)}
                            </td>
                        ))}
                    </tr>
                    {expandedUser === u.login && (
                        <tr key={`${u.login}-orders`}>
                            <td colSpan={columnsConfig.length} className="bg-gray-100 p-4">
                                {loadingOrders === u.login ? (
                                    <SpinnerFlower/>
                                ) : u.orders && u.orders.length > 0 ? (
                                    <>
                                        <h4 className="font-semibold text-gray-700 mb-2">
                                            Orders for {u.firstName} {u.lastName} ({u.login})
                                        </h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {u.orders.map(order => (
                                                <li key={order.id} className="text-xs text-gray-600">
                                                    Order ID: {order.id}, Status: {order.status}, Total items: {order.items.length}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <span className="text-gray-400 italic">No orders</span>
                                )}
                            </td>
                        </tr>
                    )}
                    </tbody>
                ))}
            </table>
        </div>
    );
};

export default UsersTable;
