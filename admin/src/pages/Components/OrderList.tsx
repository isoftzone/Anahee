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
    STATUS: string;
    PAYMENTSTATUS: string;
    ORDER_STATUS: string;
}
const OrderList: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const navigate = useNavigate();
    useEffect(() => {
        fetchSalesData(currentPage);
    }, [currentPage]);
    const fetchSalesData = async (page: number) => {
        try {
            const response = await axios.get(`${BASE_URL}/getSalesMaster`);
            const salesRaw = response.data.sales || [];
            const mappedSales: Sale[] = salesRaw.map((sale: any) => {
                const totalAmount = (sale.ITEMS || []).reduce((sum: number, item: any) => sum + item.QUANTITY * item.AMOUNT, 0);
                return {
                    SALEID: sale.SALEID,
                    NAME: sale.NAME,
                    EMAIL: sale.EMAIL,
                    DATE: sale.CREATEDON ? new Date(sale.CREATEDON).toLocaleDateString() : 'N/A',
                    AMOUNT: totalAmount,
                    PAYMENTSTATUS: sale.PAYMENTSTATUS,
                    ORDER_STATUS: sale.ORDER_STATUS,
                };
            });
            setSales(mappedSales);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching sales data:', error);
            setSales([]);
        } finally {
            setLoading(false);
        }
    };
    const updateStatus = async (saleId: number, status: string) => {
        await axios.put(`${BASE_URL}/update-order-status`, {
            SALEID: saleId,
            ORDER_STATUS: status,
        });
        setSales((prev) => prev.map((order) => (order.SALEID === saleId ? { ...order, ORDER_STATUS: status } : order)));
    };
    return (
        <div className="p-6">
            <div className="flex justify-center mb-4">
                <h2 className="text-2xl font-semibold mb-4">Order List</h2>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3">Select</th>
                            <th className="p-3">Sale Id</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Payment Status</th>
                            <th className="p-3">Order Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="text-center p-3">
                                    Loading...
                                </td>
                            </tr>
                        ) : sales.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center p-3">
                                    No Sales Data Found
                                </td>
                            </tr>
                        ) : (
                            sales.map((sale, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100">
                                    <td className="p-3">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-3 text-blue-600">{sale.SALEID}</td>
                                    <td className="p-3">{sale.NAME}</td>
                                    <td className="p-3">{sale.EMAIL}</td>
                                    <td className="p-3">{sale.DATE}</td>
                                    <td className="p-3 font-bold">₹{sale.AMOUNT}</td>
                                    <td className="p-3">{sale.PAYMENTSTATUS}</td>
                                    <td className="p-3">
                                        <select value={sale.ORDER_STATUS || ''} onChange={(e) => updateStatus(sale.SALEID, e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="Placed">Placed</option>
                                            <option value="Progress">Progress</option>
                                            <option value="Dispatched">Dispatched</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancel">Cancel</option>
                                        </select>
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <button className="text-gray-500 hover:text-blue-500" onClick={() => navigate(`/Components/orderedit/${sale.SALEID}`)}>
                                            Edit
                                        </button>
                                        {/* <button className="text-gray-500 hover:text-red-500">Delete</button> */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg" disabled={currentPage === 1}>
                        &lt;
                    </button>
                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg" disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};
export default OrderList;