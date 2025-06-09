import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
type Item = {
  ITEMID?: number;
  ITEMNAME: string;
  BARCODE: string;
  BRAND: string;
  RATE: number;
  SALEPRICE: number;
  MRP: number;
  STATUS: string;
};
export default function ItemManager() {
  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchItems();
  }, []);
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all_items`, {
        headers: { 'Content-Type': 'application/json' },
      });
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
      const handleDelete = async (id?: number) => {
        if (!id) return;
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await axios.delete(`${BASE_URL}/delete/${id}`);
                if (response.data.success) {
                    setItems((prevItems) => prevItems.filter(item => item.ITEMID !== id));
                    alert('Item deleted successfully!');
                }
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Failed to delete item');
            }
        }
    };
  const confirmDelete = async () => {
    if (selectedItemId) {
      try {
        await axios.delete(`${BASE_URL}/item/${selectedItemId}`);
        fetchItems();
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setShowModal(false);
        setSelectedItemId(null);
      }
    }
  };
  return (
    <div className="sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Item Manager</h1>
        <button
          onClick={() => navigate('/Components/item-master')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Item
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="border px-2 py-1">ITEMID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Barcode</th>
              <th className="border px-2 py-1">Brand</th>
              <th className="border px-2 py-1">MRP</th>
              <th className="border px-2 py-1">Rate</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.ITEMID}>
                <td className="border px-2 py-1">{item.ITEMID}</td>
                <td className="border px-2 py-1">{item.ITEMNAME}</td>
                <td className="border px-2 py-1">{item.BARCODE}</td>
                <td className="border px-2 py-1">{item.BRAND}</td>
                <td className="border px-2 py-1">{item.SALEPRICE}</td>
                <td className="border px-2 py-1">{item.MRP}</td>
                <td className="border px-2 py-1">{item.STATUS}</td>
                <td className="border px-2 py-1 flex space-x-2">
                  <button
                    onClick={() => navigate(`/Components/item-master/${item.ITEMID}`)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.ITEMID)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="border px-2 py-2 text-center" colSpan={8}>
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this item?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}