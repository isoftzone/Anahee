import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
interface Sale {
    SALEID: number;
    NAME: string;
    EMAIL: string;
    DATE: string;
    AMOUNT: number;
    PAYMENTSTATUS: string;
    ORDER_STATUS: string;
}
const OrderList: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Sale | null; direction: 'asc' | 'desc' }>({
        key: null,
        direction: 'asc',
    });
    const headers = [
        { key: 'SALEID', label: 'Sale ID' },
        { key: 'NAME', label: 'Name' },
        { key: 'EMAIL', label: 'Email' },
        { key: 'DATE', label: 'Date' },
        { key: 'AMOUNT', label: 'Amount' },
        { key: 'PAYMENTSTATUS', label: 'Payment Status' },
        { key: 'ORDER_STATUS', label: 'Order Status' },
    ];
    const navigate = useNavigate();
    useEffect(() => {
        fetchSalesData();
    }, []);
    const fetchSalesData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getSalesMaster`);
            console.log('API Response:', response.data);
            const salesRaw = response.data.sales || [];
            const mappedSales: Sale[] = salesRaw.map((sale: any) => {
                const totalAmount = (sale.ITEMS || []).reduce((sum: number, item: any) => sum + item.QUANTITY * item.AMOUNT, 0);
                return {
                    SALEID: sale.SALEID,
                    NAME: sale.NAME || 'N/A',
                    EMAIL: sale.EMAIL || 'N/A',
                    DATE: sale.CREATEDON ? new Date(sale.CREATEDON).toLocaleDateString() : 'N/A',
                    AMOUNT: totalAmount,
                    PAYMENTSTATUS: sale.PAYMENTSTATUS || 'N/A',
                    ORDER_STATUS: sale.ORDER_STATUS || 'N/A',
                };
            });
            setSales(mappedSales);
        } catch (error) {
            console.error('Error fetching sales data:', error);
            setSales([]);
        } finally {
            setLoading(false);
        }
    };
    const updateStatus = async (saleId: number, status: string) => {
        try {
            await axios.put(`${BASE_URL}/update-order-status`, {
                SALEID: saleId,
                ORDER_STATUS: status,
            });
            setSales((prev) => prev.map((order) => (order.SALEID === saleId ? { ...order, ORDER_STATUS: status } : order)));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    const handleSort = (key: keyof Sale) => {
        let direction: 'asc' | 'desc' = 'asc';
        // If clicking on the same column, toggle direction
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        console.log(`Sorting by ${key} in ${direction} order`); // Debug log
        setSortConfig({ key, direction });
    };
    const handleEdit = (SALEID: number) => {
        navigate(`/Components/orderedit/${SALEID}`);
    };
    const getSortIcon = (columnKey: keyof Sale) => {
        if (sortConfig.key !== columnKey) {
            return <span className="ml-2 text-gray-400"></span>; // Both arrows when not sorted
        }
        return <span className="ml-2 text-blue-600">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
    };
    const filteredAndSortedSales = React.useMemo(() => {
        let filtered = [...sales];
        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter((sale) => sale.NAME.toLowerCase().includes(searchTerm.toLowerCase()) || sale.EMAIL.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // Sort data
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];
                if (aValue === undefined || bValue === undefined) return 0;
                // Handle numeric sorting (for SALEID and AMOUNT)
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
                }
                // Handle date sorting
                if (sortConfig.key === 'DATE') {
                    const dateA = new Date(aValue as string);
                    const dateB = new Date(bValue as string);
                    // Handle invalid dates
                    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                        return String(aValue).localeCompare(String(bValue));
                    }
                    return sortConfig.direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
                }
                // Handle string sorting (for NAME, EMAIL, PAYMENTSTATUS, ORDER_STATUS)
                const stringA = String(aValue).toLowerCase();
                const stringB = String(bValue).toLowerCase();
                return sortConfig.direction === 'asc' ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
            });
        }
        return filtered;
    }, [sales, searchTerm, sortConfig]);
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-64"
                />
                {sortConfig.key && (
                    <div className="text-sm text-gray-600">
                        {/* Sorted by: {headers.find((h) => h.key === sortConfig.key)?.label} ({sortConfig.direction === 'asc' ? 'Ascending' : 'Descending'}) */}
                    </div>
                )}
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">Sr. No</th>
                            {headers.map((header) => (
                                <th
                                    key={header.key}
                                    className="p-3 cursor-pointer hover:bg-gray-300 transition-colors"
                                    onClick={() => handleSort(header.key as keyof Sale)}
                                    title={`Click to sort by ${header.label}`}
                                >
                                    <div className="flex items-center">
                                        <span>{header.label}</span>
                                        {getSortIcon(header.key as keyof Sale)}
                                    </div>
                                </th>
                            ))}
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={headers.length + 2} className="text-center p-3">
                                    Loading...
                                </td>
                            </tr>
                        ) : filteredAndSortedSales.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length + 2} className="text-center p-3">
                                    No sales data found
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedSales.map((sale, index) => (
                                <tr key={sale.SALEID} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 text-blue-600">{sale.SALEID}</td>
                                    <td className="p-3">{sale.NAME}</td>
                                    <td className="p-3">{sale.EMAIL}</td>
                                    <td className="p-3">{sale.DATE}</td>
                                    <td className="p-3 font-bold">₹{sale.AMOUNT.toFixed(2)}</td>
                                    <td className="p-3">{sale.PAYMENTSTATUS}</td>
                                    <td className="p-3">
                                        <select value={sale.ORDER_STATUS} onChange={(e) => updateStatus(sale.SALEID, e.target.value)} className="border rounded p-1">
                                            <option value="Placed">Placed</option>
                                            <option value="Progress">Progress</option>
                                            <option value="Dispatched">Dispatched</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancel">Cancel</option>
                                        </select>
                                    </td>
                                    <td className="p-3">
                                        <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(sale.SALEID)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default OrderList;