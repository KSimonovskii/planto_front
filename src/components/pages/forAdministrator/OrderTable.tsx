import type {OrderDto, OrderItemDto} from "../../../utils/types";

interface OrderTableProps {
    orders: OrderDto[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            No orders found.
                        </td>
                    </tr>
                ) : (
                    orders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.items.map((item: OrderItemDto, idx: number) => (
                                    <div key={idx}>{item.name} x{item.quantity} @ ${item.priceUnit.toFixed(2)}</div>
                                ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                    }`}>
                                        {order.status}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.paid ? 'Yes' : 'No'}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
