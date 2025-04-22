import React, { useEffect, useState } from "react";
import axios from "axios";

interface SalesDetail {
  ITEMDESC: string;
  MRP: number;
  QTY: number;
  AMOUNT: number;
}

const OrderPreview: React.FC = () => {
  const [salesDetails, setSalesDetails] = useState<SalesDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSalesDetail();
  }, []);

  const fetchSalesDetail = async () => {
    try {
      // const response = await axios.get(`http://localhost:3000/getSalesDetail}`);
      const response = await axios.get("http://localhost:3000/getSalesDetail"); // ✅ Fixed URL
      console.log("API Response:", response.data);

      if (response.data.salesDetailData) {
        setSalesDetails(response.data.salesDetailData);
      } else {
        setSalesDetails([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sales details:", error);
      setSalesDetails([]);
      setLoading(false);
    }
  };

  return (
    
    <div className="p-8 bg-gray-100 min-h-screen">
       {/* Header Buttons */}
       {/* <div className="flex justify-end space-x-3 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
          📨 Send Invoice
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
          🖨 Print
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
          ⬇ Download
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
          ➕ Create
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
          ✏ Edit
        </button>
      </div> */}
      {/* Invoice Details */}
      <div className="bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold">INVOICE</h2>

        {/* Invoice Table */}
        <div className="mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">S.NO</th>
                <th className="p-3">ITEMS</th>
                <th className="p-3">QTY</th>
                <th className="p-3">PRICE</th>
                <th className="p-3">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center p-3">Loading...</td></tr>
              ) : salesDetails.length === 0 ? (
                <tr><td colSpan={5} className="text-center p-3">No Data Found</td></tr>
              ) : (
                salesDetails.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.ITEMDESC}</td>
                    <td className="p-3">{item.QTY}</td>
                    <td className="p-3">₹{item.MRP}</td>
                    <td className="p-3 font-bold">₹{item.AMOUNT}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Total Calculation */}
        <div className="mt-6 text-right">
          <p>Subtotal: <span className="font-bold">₹3255</span></p>
          <p>Tax: <span className="font-bold">₹700</span></p>
          <p>Shipping Rate: <span className="font-bold">₹0</span></p>
          <p>Discount: <span className="font-bold">₹10</span></p>
          <p className="text-xl font-bold mt-2">Grand Total: ₹3945</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPreview;
