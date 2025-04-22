import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Sale {
  SALEID: string;
  NAME: string;
  EMAIL: string;
  DATE: string; // Adjust according to your DB structure
  AMOUNT: string; // You might need to modify this
  STATUS: string; // If status is available
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
      // const response = await axios.get(`http://localhost:3000/getSalesMaster/:saleId`);
      const response = await axios.get(`http://localhost:3000/getSalesMaster`);
      const saleId = "someId"; // Replace this with actual saleId
// const response = await axios.get(`http://localhost:3000/getSalesMaster/10001}`);
console.log("API Response:", response.data);
 // Ensure response data exists before setting state
 if (response.data.sales && Array.isArray(response.data.sales)) {
  setSales(response.data.sales); // Assign the array directly
} else {
  setSales([]); // Set empty array if data is missing or invalid
}
setTotalPages(response.data.totalPages || 1);
      // setSales(response.data.sales);
      // setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setSales([]); // Ensure sales is always an array
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
    <div className="flex justify-between mb-4">
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Add New</button>
    </div>

    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3"><input type="checkbox" /></th>
            <th className="p-3">Invoice</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Date</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
  {loading ? (
    <tr><td colSpan={8} className="text-center p-3">Loading...</td></tr>
  ) : sales.length === 0 ? (
    <tr><td colSpan={8} className="text-center p-3">No Sales Data Found</td></tr>
  ) : (
    sales.map((sale, index) => (
      <tr key={index} className="border-b hover:bg-gray-100">
        <td className="p-3"><input type="checkbox" /></td>
        <td className="p-3 text-blue-600">{sale.SALEID}</td>
        <td className="p-3">{sale.NAME}</td>
        <td className="p-3">{sale.EMAIL}</td>
        <td className="p-3">{sale.DATE}</td>
        <td className="p-3 font-bold">${sale.AMOUNT}</td>
        <td className="p-3">
          <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
            {sale.STATUS}
          </span>
        </td>
        <td className="p-3 flex gap-2">
          {/* <button className="text-gray-500 hover:text-blue-500">Edit</button> */}
          <button
      className="text-gray-500 hover:text-blue-500"
      onClick={() => navigate("/Components/orderedit")}
    >
      Edit
    </button>
          <button className="text-gray-500 hover:text-red-500">Delete</button>
          
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </div>

    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>
      <div className="flex gap-2">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
  );
};

export default OrderList;
