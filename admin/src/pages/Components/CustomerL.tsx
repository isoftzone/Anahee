import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
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
    const headers = [
        { key: 'FNAME', label: 'First Name' },
        { key: 'LNAME', label: 'Last Name' },
        { key: 'CUSTOMERID', label: 'Customer ID' },
        { key: 'MOBILE', label: 'Phone No.' },
        { key: 'CCITY', label: 'City' },
        { key: 'STATE', label: 'State' },
        { key: 'CPINCODE', label: 'Pincode' },
        { key: 'CADDRESSLINE1', label: 'Address' },
        { key: 'NAME', label: 'NAME' },
        { key: 'email', label: 'email' },
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
    // Live search logic
    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = customers.filter((customer) => Object.values(customer).some((value) => value?.toString().toLowerCase().includes(lowerSearch)));
        setFilteredCustomers(filtered);
    }, [searchTerm, customers]);
    const handleClick = () => {
        navigate('/components/AddCustomers');
    };
    const handleEdit = (customerId: string | number) => {
        navigate(`/components/EditCustomer/${customerId}`);
    };
    const handleDelete = async (customerId: string | number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
        if (!confirmDelete) return;
        try {
            await axios.delete(`${BASE_URL}/deletecustomer/${customerId}`);
            const updatedCustomers = customers.filter((c) => c.CUSTOMERID !== customerId);
            setCustomers(updatedCustomers);
            setFilteredCustomers(updatedCustomers);
            alert('Customer deleted successfully');
        } catch (error: any) {
            console.error('Error deleting customer:', error);
            alert('Failed to delete customer');
        }
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
    if (loading) return <div>Loading customers...</div>;
    if (error) return <div>Error loading customers: {error}</div>;
    return (
        <div className="customer-list-container">
            <h1>Customer List</h1>
             <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-64"
                />
            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* <input type="text" placeholder="Search customers..." className="form-control w-50" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> */}
                <button className="btn btn-primary" onClick={handleClick}>
                    + Add Customer
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sr. no</th>
                            {headers.map((header) => (
                                <th key={header.key} onClick={() => handleSort(header.key)} style={{ cursor: 'pointer' }}>
                                    <div className="d-flex align-items-center text-black">
                                        <span>{header.label}</span>
                                        {sortConfig.key === header.key && <span className="ms-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
                                    </div>
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length + 2}>No customers found.</td>
                            </tr>
                        ) : (
                            filteredCustomers.map((customer, index) => (
                                <tr key={customer.CUSTOMERID}>
                                    <td>{index + 1}</td>
                                    <td>{customer.FNAME}</td>
                                    <td>{customer.LNAME}</td>
                                    <td>{customer.CUSTOMERID}</td>
                                    <td>{customer.MOBILE}</td>
                                    <td>{customer.CCITY}</td>
                                    <td>{customer.STATE}</td>
                                    <td>{customer.CPINCODE}</td>
                                    <td>{customer.CADDRESSLINE1}</td>
                                    <td>{customer.NAME}</td>
                                    <td>{customer.email}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(customer.CUSTOMERID)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.CUSTOMERID)}>
                                            Delete
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
export default CustomersL;