import React, { useState, useEffect } from 'react';
// import './CustomerList.css'; // Create this CSS file
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
    email?: string; // Duplicate of E-mail? Clarify if needed
}
const CustomersL: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        // You can perform other actions here before navigating
        // window.alert('Button clicked!');
        navigate('/components/AddCustomers'); // Replace '/CustomerList-page' with the desired route
    };
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getAllcustomer`); // Your API endpoint
                console.log('Customer API Response:', response.data);
                setCustomers(response.data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);
    if (loading) {
        return <div>Loading customers...</div>;
    }
    if (error) {
        return <div>Error loading customers: {error}</div>;
    }
    const handleEdit = (customerId: string | number) => {
        navigate(`/components/EditCustomer/${customerId}`);
    };
    const handleDelete = async (customerId: string | number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
        if (!confirmDelete) return;
        try {
            await axios.delete(`${BASE_URL}/deletecustomer/${customerId}`);
            setCustomers((prev) => prev.filter((cust) => cust.CUSTOMERID !== customerId));
            alert('Customer deleted successfully');
        } catch (error: any) {
            console.error('Error deleting customer:', error);
            alert('Failed to delete customer');
        }
    };
    return (
        <div className="customer-list-container">
            <h1>Customer List</h1>
            <button className="add-customer-button btn btn-primary" onClick={handleClick}>
                + Add Customer
            </button>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Sr. no</th>
                            {/* <th>E-Mail</th> */}
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Customer ID</th>
                            {/* <th>GST No.</th> */}
                            <th>Phone No.</th>
                            {/* <th>City</th> */}
                            {/* <th>State</th> */}
                            {/* <th>Pincode</th> */}
                            {/* <th>Sale Price</th> */}
                            <th>Address</th>
                            {/* <th>NAME</th> */}
                            <th>email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.CUSTOMERID}>
                                <td>{index + 1}</td>
                                {/* <td>{customer.EMAILID}</td> */}
                                <td>{customer.FNAME}</td>
                                <td>{customer.LNAME}</td>
                                <td>{customer.CUSTOMERID}</td>
                                {/* <td>{customer.GSTIN}</td> */}
                                <td>{customer.MOBILE}</td>
                                {/* <td>{customer.CCITY}</td> */}
                                {/* <td>{customer.STATE}</td> */}
                                {/* <td>{customer.CPINCODE}</td> */}
                                {/* <td>{customer.SALEPRICE}</td> */}
                                <td>{customer.CADDRESSLINE1}</td>
                                {/* <td>{customer.NAME}</td> */}
                                <td>{customer.email}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(customer.CUSTOMERID)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.CUSTOMERID)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default CustomersL;
