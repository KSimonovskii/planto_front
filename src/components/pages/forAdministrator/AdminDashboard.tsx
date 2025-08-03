import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import {useNavigate} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {Home, LayoutDashboard, ListOrdered, Package} from "lucide-react";

import OrderTable from "./OrderTable.tsx";
import type {OrderDto} from "../../../utils/types";
import StatsWidgets, {type Stats} from "./StatsWidgets.tsx";

const AdminDashboard = () => {
    const {user, loadingUser, errorUser} = useCurrentUser();
    const navigate = useNavigate();

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
        })
    }, []);

    const fetchOrders = useCallback(async () => {
        setOrders([])
    }, []);

    useEffect(() => {
        fetchStats();
        fetchOrders();
    }, [fetchStats, fetchOrders]);

    if (loadingUser) return <div className="text-center mt-40">Loading admin data...</div>;
    if (errorUser) return <div className="text-center mt-40 text-red-500">Error loading admin data: {errorUser}</div>;
    if (!user) return <div className="text-center mt-40 text-red-500">Access denied: user not found</div>;


    return (
        <div className="flex min-h-screen bg-gray-100">

            <aside className="w-64 bg-[#2a4637] text-white p-6 flex flex-col">
                <div className="text-2xl font-bold mb-8 text-center">Admin Panel</div>
                <div className="mb-8 text-center">
                    <p className="text-lg font-semibold">Current administrator: {user.login}</p>
                    <p className="text-sm text-gray-400">Administrator</p>
                </div>
                <nav className="flex-grow">
                    <ul>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveSection('dashboard')}
                                className={`flex items-center w-full p-3 rounded-lg transition duration-200 ${activeSection === 'dashboard' ? 'bg-[#9acfaf] text-[#2a4637]' : 'hover:bg-gray-700'}`}
                            >
                                <LayoutDashboard size={20} className="mr-3"/> Dashboard
                            </button>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={() => navigate('/products')}
                                className={`flex items-center w-full p-3 rounded-lg transition duration-200 ${activeSection === 'products' ? 'bg-[#9acfaf] text-[#2a4637]' : 'hover:bg-gray-700'}`}
                            >
                                <Package size={20} className="mr-3"/> Products
                            </button>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveSection('orders')}
                                className={`flex items-center w-full p-3 rounded-lg transition duration-200 ${activeSection === 'orders' ? 'bg-[#9acfaf] text-[#2a4637]' : 'hover:bg-gray-700'}`}
                            >
                                <ListOrdered size={20} className="mr-3"/> Orders
                            </button>
                        </li>

                    </ul>
                </nav>
                <div className="mt-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center w-full p-3 rounded-lg transition duration-200 hover:bg-gray-700"
                    >
                        <Home size={20} className="mr-3"/> Go to Shop
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {activeSection === 'dashboard' && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
                        <StatsWidgets stats={stats}/>
                        <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Recent Orders</h2>
                        <OrderTable orders={orders}/>
                    </>
                )}
                {activeSection === 'orders' && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>
                        <OrderTable orders={orders}/>
                    </>
                )}

            </main>
        </div>
    );
};


export default AdminDashboard;