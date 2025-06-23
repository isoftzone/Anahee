import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PromotionNumber {
    id: number;
    phonenumber: string;
    created_at: string;
    first_name : string;
     last_name : string;
     email : string;
     mobile : number;
    
}

interface SortConfig {
    key: string | null;
    direction: 'asc' | 'desc' | null;
}

const PromotionNumber: React.FC = () => {
    const navigate = useNavigate();
     const [numbers, setNumbers] = useState<PromotionNumber[]>([]);
    const [filteredNumbers, setFilteredNumbers] = useState<PromotionNumber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const headers = [
        { key: 'id', label: 'Sr. No' },
        { key: 'phonenumber', label: 'Phone Number' },
         { key: 'created_at', label: 'Created At' },
    ];
    
    // useEffect(() => {
    //     const fetchNumbers = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}/getpromotionNumber`);
    //             console.log("Promotion numbers data", response.data);
    //             setNumbers(response.data);
    //             setFilteredNumbers(response.data);
    //             setLoading(false);
    //         } catch (error: any) {
    //             setError(error.message);
    //             setLoading(false);
    //         }
    //     };
    //     fetchNumbers();
    // }, []);
     useEffect(() => {
        const fetchNumbers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getpromotionNumber`);
                console.log("Promotion numbers data", response.data);
                
                // Ensure the data is an array
                const data = Array.isArray(response.data) ? response.data : [];
                
                setNumbers(data);
                setFilteredNumbers(data);
                setLoading(false);
            } catch (error: any) {
                console.error("Error fetching promotion numbers:", error);
                setError(error.message || 'Failed to fetch promotion numbers');
                setLoading(false);
                setNumbers([]);
                setFilteredNumbers([]);
            }
        };
        fetchNumbers();
    }, []);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
      const filtered = numbers.filter((number) => 
            number.phonenumber.toLowerCase().includes(lowerSearch) ||
            number.created_at.toLowerCase().includes(lowerSearch) ||
            number.id.toString().includes(lowerSearch)
        );   
         setFilteredNumbers(filtered);
        setCurrentPage(1);
    }, [searchTerm, numbers]);

       const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;

     const currentRows = filteredNumbers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredNumbers.length / rowsPerPage);

       if (loading) return <div>Loading customers...</div>;
    if (error) return <div>Error loading customers: {error}</div>;

    return (
        <div className="customer-list-container px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Promotion Number</h1>

       

            <div className="overflow-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Sr. no</th>
                             <th className="p-2 border">Phone Number</th>
                           <th className="p-2 border">Date</th>
                               <th className="p-2 border">Email</th>
                           <th className="p-2 border">First Name</th>
                            <th className="p-2 border">last Name</th>
                           <th className="p-2 border">Mobile</th>
                       
                            {/* {headers.map((header) => (
                                <th key={header.key} onClick={() => handleSort(header.key)} className="p-2 border cursor-pointer text-left">
                                    <div className="flex items-center">
                                        <span>{header.label}</span>
                                        {sortConfig.key === header.key && <span className="ml-1">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
                                    </div>
                                </th>
                            ))} */}
                            {/* <th className="p-2 border">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length + 2} className="text-center p-4">
                                    No customers found.
                                </td>
                            </tr>
                        ) : (
                            currentRows.map((customer, index) => (
                                <tr key={customer.id}>
                                    <td className="p-2 border">{indexOfFirst + index + 1}</td>
                                    <td className="p-2 border">{customer.phonenumber}</td>
                                     <td className="p-2 border">{customer.created_at}</td>
                                      <td className="p-2 border">{customer.email}</td>
                                     <td className="p-2 border">{customer.first_name}</td>
                                    <td className="p-2 border">{customer.last_name}</td>
                                     <td className="p-2 border">{customer.mobile}</td>
                                   
                                   
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex  flex-col sm:flex-row justify-between items-center mb-3 gap-2">
                <div className="text-sm">
                    Show{' '}
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        {[5, 10, 20, 50].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>{' '}
                    entries
                </div>
                <div>
                    {' '}
                    {totalPages > 1 && (
                        <div className="flex justify-end items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-1 rounded-full border text-sm ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white hover:bg-gray-100'}`}
                            >
                                Previous
                            </button>

                            {/* Page Numbers with Ellipsis */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((page) => {
                                    if (page === 1 || page === totalPages) return true;
                                    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                                    if (currentPage === 1 && page <= 3) return true;
                                    if (currentPage === totalPages && page >= totalPages - 2) return true;
                                    return false;
                                })
                                .reduce((acc: (number | '...')[], page, idx, arr) => {
                                    if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                                        acc.push('...');
                                    }
                                    acc.push(page);
                                    return acc;
                                }, [])
                                .map((page, idx) =>
                                    page === '...' ? (
                                        <span key={idx} className="px-2 text-gray-500">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentPage(page as number)}
                                            className={`px-4 py-1 rounded-full border text-sm ${currentPage === page ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'}`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-1 rounded-full border text-sm ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-white hover:bg-gray-100'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                        <p className="mb-6 text-base font-medium">Are you sure you want to delete this customer?</p>
                        {/* <div className="flex justify-center gap-4">
                            <button onClick={confirmDelete} className="px-4 py-2 bg-black text-white rounded-lg">
                                Yes
                            </button>
                            <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 text-black rounded-lg">
                                No
                            </button>
                        </div> */}
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default PromotionNumber;
