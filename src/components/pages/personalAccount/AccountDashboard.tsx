import {useNavigate} from "react-router";
import {useAuth} from "../../../features/hooks/useAuth.ts";
import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import spinner from "../../../assets/spinner2.png";
import {useEffect} from "react";

const AccountDashboard = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const {user, loadingUser, isAuthenticated, isAdmin} = useCurrentUser();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        if (isAdmin) {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [isAdmin, navigate]);

    if (loadingUser) {
        return (
            <div className="flex justify-center items-center w-full h-64">
                <img src={spinner} alt="loading..." className="spinner-icon"/>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <p className="text-center text-gray-500 mt-40 italic">
                No user data found
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                User Dashboard
            </h2>


            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 border-b pb-2 text-lime-700">
                    Account Info
                </h3>
                <div className="space-y-1 text-gray-700">
                    <p><span className="font-medium">Login:</span> {user.login}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                </div>
            </div>


            {user.address && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 border-b pb-2 text-lime-700">
                        Address
                    </h3>
                    <p className="text-gray-700">
                        {user.address.street}, {user.address.city}, {user.address.zip}
                    </p>
                </div>
            )}


            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 border-b pb-2 text-lime-700">
                    Your Orders
                </h3>
                {user.orders && user.orders.length === 0 ? (
                    <p className="text-gray-500 italic">You have no orders yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {user.orders?.map((order) => (
                            <li
                                key={order.id}
                                className="border border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <p>
                                    <span className="font-medium">Order ID:</span> {order.id}
                                </p>
                                <p>
                                    <span className="font-medium">Date:</span>{" "}
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            <div className="flex justify-center">
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AccountDashboard;
