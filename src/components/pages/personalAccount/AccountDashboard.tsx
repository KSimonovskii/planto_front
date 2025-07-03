import {useEffect, useState} from "react";
import type UserAccount from "../users/UserAccount.ts";
import {BASE_URL} from "../../../utils/constants.ts";
import {getLoginFromToken} from "../../../features/api/userAction.ts";

const AccountDashboard = () => {

    const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (token) {
                    const userLogin = getLoginFromToken(token);
                    if (!userLogin) {
                        throw new Error("Login not found in token");
                    }
                    const response = await fetch(`${BASE_URL}/account/user/${userLogin}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })

                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }

                    const data: UserAccount = await response.json();
                    setUserAccount(data);
                } else {
                    console.error("Token not found in the Local Storage");
                }
            } catch (err: any) {
                console.error(err)
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, []);

    if (loading) return <p className="text-center mt-10"> Loading ... </p>;
    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
    if (!userAccount) return <p className="text-center mt-10"> No user data found </p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Dashboard</h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : !userAccount ? (
                <p className="text-center text-gray-600">No user data found.</p>
            ) : (
                <>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Account Info</h3>
                        <p><strong>Login:</strong> {userAccount.login}</p>
                        <p><strong>Email:</strong> {userAccount.email}</p>
                    </div>

                    {userAccount.address && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Address</h3>
                            <p>{userAccount.address.street}, {userAccount.address.city}, {userAccount.address.zip}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Your Orders</h3>
                        {userAccount.orders.length === 0 ? (
                            <p className="text-gray-600">You have no orders yet.</p>
                        ) : (
                            <ul className="space-y-3">
                                {userAccount.orders.map((order) => (
                                    <li key={order.id} className="border p-3 rounded-md">
                                        <p><strong>Order ID:</strong> {order.id}</p>
                                        <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};


export default AccountDashboard