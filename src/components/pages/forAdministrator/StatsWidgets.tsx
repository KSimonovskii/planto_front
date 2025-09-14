import React from 'react';
import { DollarSign, Package, ListOrdered, Users } from 'lucide-react';

export interface Stats {
    totalSales: number;
    totalProductsSold: number;
    totalOrders: number;
    totalClients: number;
}

interface StatsWidgetsProps {
    stats: Stats;
    onWidgetClick?: (section: string) => void;
}

const StatsWidgets: React.FC<StatsWidgetsProps> = ({ stats, onWidgetClick }) => {
    const widgets = [
        {
            title: 'Total Sales',
            value: `$${stats.totalSales.toFixed(2)}`,
            change: ' ',
            icon: <DollarSign size={24} className="text-green-500" />,
            bgColor: 'bg-green-50',
            textColor: 'text-green-800',
            section: "dashboard"
        },
        {
            title: 'Products',
            value: stats.totalProductsSold.toLocaleString(),
            change: ' ',
            icon: <Package size={24} className="text-blue-500" />,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-800',
            section: "products"
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders.toLocaleString(),
            change: ' ',
            icon: <ListOrdered size={24} className="text-purple-500" />,
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-800',
            section: "orders"
        },
        {
            title: 'Total Clients',
            value: stats.totalClients.toLocaleString(),
            change: ' ',
            icon: <Users size={24} className="text-yellow-500" />,
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-800',
            section: "clients"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {widgets.map((widget, index) => (
                <div
                    key={index}
                    className={`p-6 rounded-lg shadow-md ${widget.bgColor} flex items-center justify-between transition cursor-pointer hover:shadow-lg hover:scale-[1.02]`}
                    onClick={() => widget.section && onWidgetClick?.(widget.section)}
                >
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">{widget.title}</h3>
                        <p className={`text-3xl font-bold ${widget.textColor} mt-1`}>{widget.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{widget.change}</p>
                    </div>
                    <div className="p-3 rounded-full bg-white/50">
                        {widget.icon}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsWidgets;
