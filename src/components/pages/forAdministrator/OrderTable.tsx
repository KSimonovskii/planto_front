import {useContext} from "react";
import {OrderContext} from "../orders/OrderContext.ts";
import type {OrderDto, OrderItemDto} from "../../../utils/types";
import {useOrderActions} from "../../../features/hooks/useOrderActions.ts";
import {Trash2} from "lucide-react";

const OrdersTable = () => {
    const {orders, refreshOrders} = useContext(OrderContext);
    const {deleteOrder} = useOrderActions()


    const handleDeleteOrder = async (orderId: string) => {
        try {
            await deleteOrder(orderId);
            if (refreshOrders) {
                refreshOrders();
            }
        } catch (error) {
            console.error("Failed to delete order:", error);
        }
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
                    <th className="px-4 py-2 border">Delete order</th>
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

                            {/* User */}
                            <td className="px-4 py-2 border">
                                <div
                                    className="cursor-pointer text-lime-800 font-semibold hover:underline"
                                >
                                    {o.user?.login || "Unknown"}
                                </div>
                                {o.id && o.user && (
                                    <div className="mt-1 text-gray-600 text-xs flex flex-col gap-1">
                                        {o.user.firstName && <span>First Name: {o.user.firstName}</span>}
                                        {o.user.lastName && <span>Last Name: {o.user.lastName}</span>}
                                        {o.user.email && <span>Email: {o.user.email}</span>}
                                        {o.user.address?.city && <span>City: {o.user.address.city}</span>}
                                        {o.user.address?.street && <span>Street: {o.user.address.street}</span>}
                                        {o.user.address?.house && <span>House: {o.user.address.house}</span>}
                                    </div>
                                )}
                            </td>

                            {/* Products column */}
                            <td className="px-4 py-2 border">
                                {o.items && o.items.length > 0 ? (
                                    o.items.map((item: OrderItemDto, idx: number) => (
                                        <div key={idx} className="truncate">
                                            {item.name} x {item.quantity} - ₪{item.priceUnit.toFixed(2)}
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

                            {/* Delete */}
                            <td className="px-4 py-2 border text-center">
                                <button
                                    onClick={() => handleDeleteOrder(o.id)}
                                    className="text-lime-800 hover:text-red-800 transition-colors"
                                    title="Delete Order"
                                >
                                    <Trash2 size={18} className="inline-block"/>
                                </button>
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
