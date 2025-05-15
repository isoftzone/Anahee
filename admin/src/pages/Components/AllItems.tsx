import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

type Item = {
  ITEMID?: number;
  ITEMNAME: string;
  BARCODE: string;
  BRAND: string;
  RATE: number;
  MRP: number;
  STATUS: string;
};

export default function ItemManager() {
  const [items, setItems] = useState<Item[]>([]);
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
      await axios.delete(`${BASE_URL}/item/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="p-6">
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
              <th className="border px-2 py-1">Rate</th>
              <th className="border px-2 py-1">MRP</th>
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
                <td className="border px-2 py-1">{item.RATE}</td>
                <td className="border px-2 py-1">{item.MRP}</td>
                <td className="border px-2 py-1">{item.STATUS}</td>
                <td className="border px-2 py-1 flex space-x-2">
                  <button
                    onClick={() => navigate(`/Components/item-master/${item.ITEMID}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.ITEMID)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
    </div>
  );
}
