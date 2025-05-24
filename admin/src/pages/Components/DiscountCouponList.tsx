import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';

interface DiscountCoupon {
  my_row_id: number;
  coupon_code: string;
  valid_from: string;
  valid_to: string;
  max_discount_amount: number;
  status: 0 | 1;
  is_percentage: 0 | 1;
  discount_value: number;
  minimum_bill_amount: number;
  redeemed_count: number;
  CREATEDON: string;
}

const DiscountCouponList: React.FC = () => {
  const [coupons, setCoupons] = useState<DiscountCoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState<{ show: boolean; id: number | null; newStatus: 0 | 1 }>({ show: false, id: null, newStatus: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getcoupons`);
        if (response.data && response.data.data) {
          setCoupons(response.data.data);
        }
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.msg || err.message
            : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleShowEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowEntries(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusUpdate = async (id: number, newStatus: 0 | 1) => {
    const originalCoupons = [...coupons];
    try {
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.my_row_id === id ? { ...coupon, status: newStatus } : coupon
        )
      );
      const response = await axios.put(`${BASE_URL}/updatecoupons/${id}`, { status: newStatus });
      if (!response.data.success) {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      setCoupons(originalCoupons);
      console.error('Error updating coupon status:', err);
      alert('Failed to update coupon status. Please try again.');
    } finally {
      setModal({ show: false, id: null, newStatus: 0 });
    }
  };

  const toggleStatus = (id: number) => {
    const coupon = coupons.find((c) => c.my_row_id === id);
    if (coupon) {
      const newStatus = coupon.status === 1 ? 0 : 1;
      setModal({ show: true, id, newStatus });
    }
  };

  const handleEditCoupon = (id: number) => {
    navigate(`/Components/discountcoupon/${id}`);
  };

  const filteredCoupons = coupons.filter((coupon) =>
    Object.entries(coupon).some(([key, value]) => {
      if (['my_row_id', 'is_percentage', 'minimum_bill_amount'].includes(key)) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const currentCoupons = filteredCoupons.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCoupons.length / showEntries);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <div className="loading">Loading coupons...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Discount Coupon List</h1>

      <button
        onClick={() => navigate('/Components/discountcoupon')}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        ➕ Add Discount Coupon
      </button>

      <div className="flex justify-between mb-4">
        <div>
          Show{' '}
          <select value={showEntries} onChange={handleShowEntriesChange} className="border rounded px-2 py-1">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{' '}
          entries
        </div>
        <div>
          Search:{' '}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Sr.No</th>
              <th className="border p-2">Code</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Max Discount Amount</th>
              <th className="border p-2">Discount Value</th>
              <th className="border p-2">Min Bill Amount</th>
              <th className="border p-2">Max Redeem</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCoupons.map((coupon, index) => (
              <tr key={coupon.my_row_id}>
                <td className="border p-2">{startIndex + index + 1}</td>
                <td className="border p-2">{coupon.coupon_code}</td>
                <td className="border p-2">{new Date(coupon.valid_from).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(coupon.valid_to).toLocaleDateString()}</td>
                <td className="border p-2">{coupon.max_discount_amount}</td>
                <td className="border p-2">
                  {coupon.discount_value}
                  {coupon.is_percentage ? '%' : ''}
                </td>
                <td className="border p-2">{coupon.minimum_bill_amount}</td>
                <td className="border p-2">{coupon.redeemed_count}</td>
                <td className="border p-2 text-center">
                  <label className="flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={coupon.status === 1}
                      onChange={() => toggleStatus(coupon.my_row_id)}
                    />
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
                        coupon.status ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform ${
                          coupon.status ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditCoupon(coupon.my_row_id)}
                    className="text-blue-600 hover:underline"
                  >
                    🖍 Edit
                  </button>
                </td>
              </tr>
            ))}
            {currentCoupons.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No discount coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {filteredCoupons.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(endIndex, filteredCoupons.length)} of {filteredCoupons.length} entries
        </span>
        <div className="flex gap-2">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded">
            Previous
          </button>
          <span className="px-2">{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Status Change</h2>
            <p>
              Are you sure you want to{' '}
              <strong>{modal.newStatus === 1 ? 'activate' : 'deactivate'}</strong> this coupon?
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => modal.id !== null && handleStatusUpdate(modal.id, modal.newStatus)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setModal({ show: false, id: null, newStatus: 0 })}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountCouponList;
