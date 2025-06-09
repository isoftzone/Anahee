
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Customer {
    COMPANYID: number;
    FNAME: string;
    LNAME: string;
    EMAILID: string;
    CUSTOMERID: number | string;
    GSTIN?: string;
    MOBILE?: string;
    CCITY?: string;
    STATE?: string;
    CPINCODE?: number | string;
    SALEPRICE?: number | string;
    STATUS?: number;
    TRANSPORT?: string;
    CADDRESSLINE1?: string;
    NAME?: string;
    email?: string;
    CSTATE?: string;
    CCOUNTRY?: string;
}

interface SortConfig {
    key: string | null;
    direction: 'asc' | 'desc' | null;
}

const CustomersL: React.FC = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | string | null>(null);

    const headers = [
        { key: 'FNAME', label: 'First Name' },
        { key: 'LNAME', label: 'Last Name' },
        { key: 'CUSTOMERID', label: 'Customer ID' },
        { key: 'MOBILE', label: 'Phone No.' },
        { key: 'CCOUNTRY', label: 'Country' },
        { key: 'CSTATE', label: 'State' },
        { key: 'CCITY', label: 'City' },
        { key: 'CPINCODE', label: 'Pincode' },
        { key: 'CADDRESSLINE1', label: 'Address' },
        { key: 'email', label: 'Email' },
    ];

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getAllcustomer`);
                setCustomers(response.data);
                setFilteredCustomers(response.data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = customers.filter((customer) => Object.values(customer).some((value) => value?.toString().toLowerCase().includes(lowerSearch)));
        setFilteredCustomers(filtered);
        setCurrentPage(1);
    }, [searchTerm, customers]);

    const handleClick = () => {
        navigate('/components/AddCustomers');
    };

    const handleEdit = (customerId: string | number) => {
        navigate(`/components/EditCustomer/${customerId}`);
    };

    const handleDelete = (customerId: string | number) => {
        setSelectedCustomerId(customerId);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedCustomerId) return;

        try {
            await axios.delete(`${BASE_URL}/deletecustomer/${selectedCustomerId}`);
            const updatedCustomers = customers.filter((c) => c.CUSTOMERID !== selectedCustomerId);
            setCustomers(updatedCustomers);
            setFilteredCustomers(updatedCustomers);
            toast.success('Customer deleted successfully');
        } catch (error: any) {
            console.error('Error deleting customer:', error);
            toast.error('Failed to delete customer');
        } finally {
            setShowModal(false);
            setSelectedCustomerId(null);
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedCustomerId(null);
    };

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        const sorted = [...filteredCustomers].sort((a, b) => {
            const aValue = a[key as keyof Customer];
            const bValue = b[key as keyof Customer];
            if (aValue === undefined || bValue === undefined) return 0;
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return direction === 'asc' ? aValue - bValue : bValue - aValue;
            }
            return direction === 'asc' ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
        });
        setFilteredCustomers(sorted);
    };

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentRows = filteredCustomers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

    if (loading) return <div>Loading customers...</div>;
    if (error) return <div>Error loading customers: {error}</div>;

    return (
        <div className="customer-list-container px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Customer List</h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full mb-4">
                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
                />
                <button onClick={handleClick} className="btn btn-info sm:mt-4 mt-0  rounded px-4 py-2 ">
                    + Add Customer
                </button>
            </div>

            <div className="overflow-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Sr. no</th>
                            {headers.map((header) => (
                                <th key={header.key} onClick={() => handleSort(header.key)} className="p-2 border cursor-pointer text-left">
                                    <div className="flex items-center">
                                        <span>{header.label}</span>
                                        {sortConfig.key === header.key && <span className="ml-1">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
                                    </div>
                                </th>
                            ))}
                            <th className="p-2 border">Actions</th>
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
                                <tr key={customer.CUSTOMERID}>
                                    <td className="p-2 border">{indexOfFirst + index + 1}</td>
                                    <td className="p-2 border">{customer.FNAME}</td>
                                    <td className="p-2 border">{customer.LNAME}</td>
                                    <td className="p-2 border">{customer.CUSTOMERID}</td>
                                    <td className="p-2 border">{customer.MOBILE}</td>
                                    <td className="p-2 border">{customer.CCOUNTRY}</td>
                                    <td className="p-2 border">{customer.CSTATE}</td>
                                    <td className="p-2 border">{customer.CCITY}</td>
                                    <td className="p-2 border">{customer.CPINCODE}</td>
                                    <td className="p-2 border">{customer.CADDRESSLINE1}</td>
                                    <td className="p-2 border">{customer.email}</td>
                                    <td className="p-2 border">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(customer.CUSTOMERID)} className="btn btn-warning px-3 py-1 text-sm">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(customer.CUSTOMERID)} className="btn btn-danger px-3 py-1  text-sm">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
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
                    {totalPages > 1 && (
                        <div className="flex justify-end items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-1 rounded-full border text-sm ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white hover:bg-gray-100'}`}
                            >
                                Previous
                            </button>

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
                        <div className="flex justify-center gap-4">
                            <button onClick={confirmDelete} className="px-4 py-2 bg-black text-white rounded-lg">
                                Yes
                            </button>
                            <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 text-black rounded-lg">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default CustomersL;
