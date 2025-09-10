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

    if (loadingUser) return (
        <div className="flex justify-center items-center w-full h-64">
            <img src={spinner} alt="loading..." className="spinner-icon"/>
        </div>
    )
    if (!isAuthenticated || !user) return <p className="text-center mt-40"> No user data found </p>;


    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Dashboard</h2>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Account Info</h3>
                <p><strong>Login:</strong> {user.login}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            {user.address && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <p>{user.address.street}, {user.address.city}, {user.address.zip}</p>
                </div>
            )}

            <div>
                <h3 className="text-lg font-semibold mb-2">Your Orders</h3>
                {user.orders && user.orders.length === 0 ? (
                    <p className="text-gray-600">You have no orders yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {user.orders && user.orders.map((order) => (
                            <li key={order.id} className="border p-3 rounded-md">
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button
                onClick={handleLogout}
                className="px-5 py-2 mt-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
                Logout
            </button>
        </div>
    );
};


export default AccountDashboard