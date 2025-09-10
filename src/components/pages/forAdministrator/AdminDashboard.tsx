import { useCurrentUser } from "../../../features/hooks/useCurrentUser.ts";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../features/hooks/useAuth.ts";

import OrderTable from "./OrderTable.tsx";
import type { OrderDto } from "../../../utils/types";
import StatsWidgets, { type Stats } from "./StatsWidgets.tsx";
import spinner from "../../../assets/spinner2.png";
import ProductsManager from "./products/ProductsManager.tsx";


const AdminDashboard = () => {
    const { user, loadingUser, errorUser } = useCurrentUser();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [activeSection, setActiveSection] = useState("dashboard");
    const [stats, setStats] = useState<Stats>({
        totalSales: 0,
        totalProductsSold: 0,
        totalOrders: 0,
        totalClients: 0
    });
    const [orders, setOrders] = useState<OrderDto[]>([]);

    const fetchStats = useCallback(async () => {
        setStats({
            totalSales: 0,
            totalProductsSold: 0,
            totalOrders: 0,
            totalClients: 0
        });
    }, []);

    const fetchOrders = useCallback(async () => {
        setOrders([]);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        fetchStats();
        fetchOrders();
    }, [fetchStats, fetchOrders]);

    if (loadingUser) return (
        <div className="flex justify-center items-center w-full h-64">
            <img src={spinner} alt="loading..." className="spinner-icon"/>
        </div>
    );

    if (errorUser) return <div className="text-center mt-40 text-red-500">Error loading admin data: {errorUser}</div>;
    if (!user) return <div className="text-center mt-40 text-red-500">Access denied: user not found</div>;

    return (
        <div className="flex min-h-screen">


            <aside className="w-64 bg-[#2a4637] text-white p-6 flex flex-col gap-6 flex-shrink-0">
                <div className="text-2xl font-bold text-center md:text-left">Admin Panel</div>
                <div className="text-center md:text-left">
                    <p className="text-lg font-semibold">Current administrator: {user.login}</p>
                </div>

                <nav className="flex flex-col gap-3 mt-4">
                    <button
                        onClick={() => setActiveSection("dashboard")}
                        className={`w-full px-4 py-2 bg-lime-600 hover:bg-lime-800 rounded-lg text-white font-medium text-base text-center transition ${
                            activeSection === "dashboard" ? "ring-2 ring-lime-400" : ""
                        }`}
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => setActiveSection("products")}
                        className={`w-full px-4 py-2 bg-lime-600 hover:bg-lime-800 rounded-lg text-white font-medium text-base text-center transition ${
                            activeSection === "products" ? "ring-2 ring-lime-400" : ""
                        }`}
                    >
                        Products
                    </button>

                    <button
                        onClick={() => setActiveSection("orders")}
                        className={`w-full px-4 py-2 bg-lime-600 hover:bg-lime-800 rounded-lg text-white font-medium text-base text-center transition ${
                            activeSection === "orders" ? "ring-2 ring-lime-400" : ""
                        }`}
                    >
                        Orders
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-lime-600 hover:bg-lime-800 rounded-lg text-white font-medium text-base text-center transition"
                    >
                        Logout
                    </button>
                </nav>
            </aside>


            <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-100">
                {activeSection === "dashboard" && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
                        <StatsWidgets stats={stats} />

                        <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Recent Orders</h2>
                        <OrderTable orders={orders} />
                    </>
                )}

                {activeSection === "orders" && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>
                        <OrderTable orders={orders} />
                    </>
                )}

                {activeSection === "products" && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Products Management</h1>
                        <ProductsManager/>
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
