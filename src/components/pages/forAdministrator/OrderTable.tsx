import { useContext, useState } from "react";
import { OrderContext } from "../orders/OrderContext.ts";
import type { OrderDto, OrderItemDto } from "../../../utils/types";

const OrdersTable = () => {
    const { orders } = useContext(OrderContext);
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

    const toggleUserDetails = (orderId: string) => {
        setExpandedUserId(expandedUserId === orderId ? null : orderId);
    };

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border border-gray-200 text-sm text-left text-gray-700">
                <caption className="text-lg font-semibold p-4 bg-gray-50 border-b border-gray-200">
                    List of orders
                </caption>
                <thead className="bg-lime-200 text-gray-800">
                <tr>
                    <th className="px-4 py-2 border">Order ID</th>
                    <th className="px-4 py-2 border">User</th>
                    <th className="px-4 py-2 border">Products</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Payment</th>
                    <th className="px-4 py-2 border">Paid</th>
                </tr>
                </thead>
                <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="text-center text-gray-400 py-4 italic">
                            No orders found
                        </td>
                    </tr>
                ) : (
                    orders.map((o: OrderDto) => (
                        <tr key={o.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border font-medium">{o.id}</td>

                            {/* User column with expandable details */}
                            <td className="px-4 py-2 border">
                                <div
                                    className="cursor-pointer text-lime-800 font-semibold hover:underline"
                                    onClick={() => toggleUserDetails(o.id)}
                                >
                                    {o.user?.name || "Unknown"}
                                </div>
                                {expandedUserId === o.id && o.user && (
                                    <div className="mt-1 text-gray-600 text-xs flex flex-col gap-1">
                                        <span>Email: {o.user.email}</span>
                                        {o.user.phone && <span>Phone: {o.user.phone}</span>}
                                        {o.user.address && <span>Address: {o.user.address}</span>}
                                    </div>
                                )}
                            </td>

                            {/* Products column */}
                            <td className="px-4 py-2 border">
                                {o.items && o.items.length > 0 ? (
                                    o.items.map((item: OrderItemDto, idx: number) => (
                                        <div key={idx} className="truncate">
                                            {item.name} x{item.quantity} @ ₪{item.priceUnit.toFixed(2)}
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-gray-400 italic">No items</span>
                                )}
                            </td>

                            {/* Status */}
                            <td className="px-4 py-2 border">
                  <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          o.status === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : o.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {o.status}
                  </span>
                            </td>

                            {/* Date */}
                            <td className="px-4 py-2 border">
                                {new Date(o.orderDate).toLocaleString()}
                            </td>

                            {/* Payment method */}
                            <td className="px-4 py-2 border">{o.paymentMethod || "—"}</td>

                            {/* Paid */}
                            <td className="px-4 py-2 border">
                                {o.paid ? (
                                    <span className="text-green-600 font-semibold">Yes</span>
                                ) : (
                                    <span className="text-red-600 font-semibold">No</span>
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
