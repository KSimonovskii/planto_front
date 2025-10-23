import { useState } from "react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../../../features/hooks/useCurrentUser.ts";
import SpinnerFlower from "../../../assets/SpinnerFlower.tsx";
import { useGetOrdersByUserQuery } from "../../../features/api/orderApi.ts";
import { useAuth } from "../../../features/hooks/useAuth.ts";
import type { OrderDto } from "../../../utils/types";

const AccountDashboard = () => {
    const navigate = useNavigate();
    const { user, loadingUser, isAuthenticated } = useCurrentUser();
    const { logout } = useAuth();

    const {
        data: orders = [],
        isLoading: loadingOrders,
        isFetching,
        isError,
        refetch,
        error,
    } = useGetOrdersByUserQuery(user?.login ?? "", { skip: !user?.login });

    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

    const toggleOrder = (id: string) =>
        setExpandedOrders((prev) => {
            const copy = new Set(prev);
            if (copy.has(id)) copy.delete(id);
            else copy.add(id);
            return copy;
        });

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const calcOrderTotal = (order: OrderDto) => {
        const items = order.items ?? [];
        return items.reduce((s, it) => s + (Number(it.priceUnit ?? 0) * (it.quantity ?? 0)), 0);
    };

    if (loadingUser) return <SpinnerFlower />;

    if (!isAuthenticated || !user) {
        return <p className="text-center text-gray-500 mt-40 italic">No user data found</p>;
    }

    return (
        <div className="p-6 sm:p-8 bg-[#f6f8f6] min-h-screen text-[#2a4637]">
            <div className="max-w-6xl mx-auto md:grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4 bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-extrabold mb-4 text-lime-700">Account Info</h2>
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Login:</span> {user.login}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                        {user.address && (
                            <p>
                                <span className="font-medium">Address:</span> {user.address.street}, {user.address.city}, {user.address.zip}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="text-sm text-gray-600">Orders: <span className="font-semibold text-gray-800">{orders.length}</span></div>

                        <button
                            onClick={() => void refetch()}
                            className="w-full py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition"
                            disabled={loadingOrders || isFetching}
                        >
                            {isFetching ? "Refreshing..." : "Refresh Orders"}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full mt-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="md:col-span-8 bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-extrabold text-lime-700">Your Orders</h2>
                        <div className="text-sm text-gray-500">{loadingOrders ? "Loading..." : `${orders.length} order(s)`}</div>
                    </div>

                    {isError && <div className="text-red-500 mb-3">Failed to load orders{error ? `: ${JSON.stringify(error)}` : ""}</div>}

                    {loadingOrders ? (
                        <div className="py-8 text-center"><SpinnerFlower /></div>
                    ) : orders.length === 0 ? (
                        <p className="text-gray-500 italic">You have no orders yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {orders.map(order => {
                                const isExpanded = expandedOrders.has(order.id);
                                const items = order.items ?? [];
                                return (
                                    <li key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <button className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition" onClick={() => toggleOrder(order.id)}>
                                            <div>
                                                {/*<div className="text-sm text-gray-600"><span className="font-medium">Order ID:</span> {order.id}</div>*/}
                                                <div className="text-sm text-gray-600"><span className="font-medium">Date:</span> {new Date(order.orderDate).toLocaleDateString()}</div>
                                                <div className="text-sm text-gray-600"><span className="font-medium">Status:</span> {order.status ?? "—"}</div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-lg font-semibold">₪{calcOrderTotal(order).toFixed(2)}</div>
                                                <div className="text-sm text-gray-500">{items.length} items</div>
                                            </div>
                                        </button>

                                        {isExpanded && (
                                            <div className="p-4 bg-white">
                                                {items.length === 0 ? (
                                                    <div className="text-sm text-gray-500 italic">No items in this order</div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {items.map((it, idx) => (
                                                            <div key={it.productId ?? idx} className="flex items-center gap-4 border rounded-md p-3">
                                                                <div
                                                                    className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 cursor-pointer"
                                                                    onClick={() => it.productId && navigate(`/product/${it.productId}`)}
                                                                >
                                                                    {it.imageUrl ? (
                                                                        <img
                                                                            src={it.imageUrl}
                                                                            alt={it.name ?? "Product image"}
                                                                            className="w-full h-full object-cover"
                                                                            loading="lazy"
                                                                            onError={(e) => {
                                                                                const img = e.currentTarget as HTMLImageElement;
                                                                                img.onerror = null;
                                                                                img.src = "/images/placeholder.png";
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
                                                                    )}
                                                                </div>

                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-sm font-medium text-gray-800 truncate">{it.name ?? "Product"}</div>
                                                                    <div className="text-xs text-gray-500">Qty: {it.quantity}</div>
                                                                </div>

                                                                <div className="text-right">
                                                                    <div className="text-sm text-gray-600">₪{Number(it.priceUnit ?? 0).toFixed(2)}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountDashboard;
