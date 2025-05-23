// import React, { useState } from 'react';
// // import '../tailwind.css'; // Optional: For more specific styling
// import { useNavigate } from "react-router-dom";

// interface DiscountCoupon {
//   srNo: number;
//   code: string;
//   from: string;
//   to: string;
//   maxRedeemAmount: number;
//   status: 'Active' | 'InActive';
//   id: number; // Unique identifier
// }

// const initialCoupons: DiscountCoupon[] = [
//   { srNo: 1, code: '155', from: '2020-08-01', to: '2021-05-31', maxRedeemAmount: 50, status: 'Active', id: 1 },
//   { srNo: 2, code: 'discount150', from: '2020-08-01', to: '2020-08-25', maxRedeemAmount: 50, status: 'Active', id: 2 },
//   { srNo: 3, code: 'test12', from: '2020-08-01', to: '2020-08-31', maxRedeemAmount: 50, status: 'InActive', id: 3 },
//   { srNo: 4, code: 'YC50', from: '2020-09-01', to: '2020-09-30', maxRedeemAmount: 0, status: 'Active', id: 4 },
//   { srNo: 5, code: 'Diwali', from: '2020-10-21', to: '2020-10-31', maxRedeemAmount: 100, status: 'InActive', id: 5 },
//   { srNo: 6, code: 'IPL15', from: '2020-10-21', to: '2020-10-31', maxRedeemAmount: 200, status: 'Active', id: 6 },
//   { srNo: 7, code: 'HOL10', from: '2021-03-28', to: '2021-04-15', maxRedeemAmount: 500, status: 'Active', id: 7 },
//   { srNo: 8, code: '5126HFG', from: '2021-07-14', to: '2021-07-17', maxRedeemAmount: 6, status: 'InActive', id: 8 },
//   { srNo: 9, code: 'Diwali50', from: '2021-09-17', to: '2021-11-30', maxRedeemAmount: 100, status: 'Active', id: 9 },
// ];

// const DiscountCouponList: React.FC = () => {
//   const [coupons, setCoupons] = useState(initialCoupons);
//   const [showEntries, setShowEntries] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//     const navigate = useNavigate();

//   const handleShowEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setShowEntries(parseInt(event.target.value, 10));
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   const handleToggleStatus = (id: number) => {
//     setCoupons((prevCoupons) =>
//       prevCoupons.map((coupon) =>
//         coupon.id === id ? { ...coupon, status: coupon.status === 'Active' ? 'InActive' : 'Active' } : coupon
//       )
//     );
//     console.log(`Toggled status for ID: ${id}`);
//     // In a real application, you would likely make an API call here.
//   };

//   const handleEditCoupon = (id: number) => {
//     console.log(`Edit coupon with ID: ${id}`);
//     alert(`Navigating to edit page for coupon ID: ${id}`);
//     // In a real application, you would navigate to an edit form.
//   };

//   // Implement logic to filter and paginate the coupons
//   const filteredCoupons = coupons.filter((coupon) =>
//     Object.values(coupon).some((value) =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const startIndex = (currentPage - 1) * showEntries;
//   const endIndex = startIndex + showEntries;
//   const currentCoupons = filteredCoupons.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(filteredCoupons.length / showEntries);

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div className="discount-coupon-list-page">
//       <h1>Discount Coupon List</h1>

//       <button
//           onClick={() => navigate("/Components/discountcoupon")}

//       className="add-discount-coupon-button">
//         ➕ Add Discount Coupon
//       </button>

//       <div className="list-controls">
//         <div className="show-entries">
//           Show
//           <select value={showEntries} onChange={handleShowEntriesChange}>
//             <option value="10">10</option>
//             <option value="25">25</option>
//             <option value="50">50</option>
//             <option value="100">100</option>
//           </select>
//           entries
//         </div>
//         <div className="search-bar">
//           Search: <input type="text" value={searchTerm} onChange={handleSearchChange} />
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table>
//           <thead>
//             <tr>
//               <th>Sr.No</th>
//               <th>Code</th>
//               <th>From</th>
//               <th>To</th>
//               <th>Max Redeem Amount</th>
//               <th>STATUS</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentCoupons.map((coupon) => (
//               <tr key={coupon.id}>
//                 <td>{coupon.srNo}</td>
//                 <td>{coupon.code}</td>
//                 <td>{coupon.from}</td>
//                 <td>{coupon.to}</td>
//                 <td>{coupon.maxRedeemAmount}</td>
//                 <td>{coupon.status}</td>
//                 <td>
//                   <button className="edit-button" onClick={() => handleEditCoupon(coupon.id)}>
//                     🖍
//                   </button>
//                   <button
//                     className={`toggle-button ${coupon.status === 'Active' ? 'active' : 'inactive'}`}
//                     onClick={() => handleToggleStatus(coupon.id)}
//                   >
//                     {coupon.status === 'Active' ? '📝' : '📝'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {currentCoupons.length === 0 && (
//               <tr>
//                 <td colSpan={7}>No discount coupons found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="list-pagination">
//         Showing {startIndex + 1} to {Math.min(endIndex, filteredCoupons.length)} of {filteredCoupons.length} entries
//         <div className="pagination-controls">
//           <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//             Previous
//           </button>
//           <span>{currentPage}</span>
//           <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscountCouponList;

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
    status: 0 | 1; // 0 = Inactive, 1 = Active
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getcoupons`); // Replace with your actual endpoint
                if (response.data && response.data.data) {
                    setCoupons(response.data.data);
                }
            } catch (err) {
                setError(axios.isAxiosError(err) ? err.response?.data?.msg || err.message : 'An unknown error occurred');
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
            // Optimistic UI update
            setCoupons((prevCoupons) => prevCoupons.map((coupon) => (coupon.my_row_id === id ? { ...coupon, status: newStatus } : coupon)));

            // API call to update status
            const response = await axios.put(`${BASE_URL}/updatecoupons/${id}`, {
                status: newStatus,
            });

            if (!response.data.success) {
                throw new Error('Failed to update status');
            }
        } catch (err) {
            // Revert on error
            setCoupons(originalCoupons);
            console.error('Error updating coupon status:', err);
            alert('Failed to update coupon status. Please try again.');
        }
    };
    const toggleStatus = (id: number) => {
        const coupon = coupons.find((c) => c.my_row_id === id);
        if (coupon) {
            const newStatus = coupon.status === 1 ? 0 : 1;
            handleStatusUpdate(id, newStatus);
        }
    };
    const handleEditCoupon = (id: number) => {
        navigate(`/Components/discountcoupon/${id}`);
    };

    // Filter coupons based on search term
    const filteredCoupons = coupons.filter((coupon) =>
        Object.entries(coupon).some(([key, value]) => {
            // Skip some fields that might not be relevant for search
            if (['my_row_id', 'is_percentage', 'minimum_bill_amount'].includes(key)) return false;
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    // Pagination logic
    const startIndex = (currentPage - 1) * showEntries;
    const endIndex = startIndex + showEntries;
    const currentCoupons = filteredCoupons.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredCoupons.length / showEntries);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <div className="loading">Loading coupons...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="discount-coupon-list-page">
            <h1>Discount Coupon List</h1>

            <button onClick={() => navigate('/Components/discountcoupon')} className="add-discount-coupon-button">
                ➕ Add Discount Coupon
            </button>

            <div className="list-controls">
                <div className="show-entries">
                    Show
                    <select value={showEntries} onChange={handleShowEntriesChange}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    entries
                </div>
                <div className="search-bar">
                    Search: <input type="text" value={searchTerm} onChange={handleSearchChange} />
                </div>
            </div>

            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Code</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Max Discount Amount</th>
                            <th>Discount Value</th>
                            <th>Min Bill Amount</th>
                            <th>Max Redeem Amount</th>
                            <th>STATUS</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCoupons.map((coupon, index) => (
                            <tr key={coupon.my_row_id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{coupon.coupon_code}</td>
                                <td>{new Date(coupon.valid_from).toLocaleDateString()}</td>
                                <td>{new Date(coupon.valid_to).toLocaleDateString()}</td>
                                <td>{coupon.max_discount_amount}</td>
                                <td>
                                    {coupon.discount_value}
                                    {coupon.is_percentage ? '%' : ''}
                                </td>
                                <td>{coupon.minimum_bill_amount}</td>
                                <td>{coupon.redeemed_count}</td>
                                <td>
                                    <div className="flex flex-col">
                                        <label className="flex items-center cursor-pointer">
                                            <input type="checkbox" name="status" className="hidden" checked={coupon.status === 1} onChange={() => toggleStatus(coupon.my_row_id)} />
                                            <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${coupon.status ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform ${coupon.status ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEditCoupon(coupon.my_row_id)}>
                                        🖍
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {currentCoupons.length === 0 && (
                            <tr>
                                <td colSpan={10}>No discount coupons found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="list-pagination">
                Showing {filteredCoupons.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredCoupons.length)} of {filteredCoupons.length} entries
                <div className="pagination-controls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>{currentPage}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscountCouponList;
