import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
const EditCustomer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getcustomerbyid/${id}`);
                console.log('Fetched customer data:', response.data); // Debug log
                setCustomer(response.data);
                setLoading(false);
            } catch (error: any) {
                console.error('Error fetching customer:', error);
                setError('Failed to load customer');
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [id]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (customer) {
            setCustomer({
                ...customer,
                [e.target.name]: e.target.value,
            });
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Sending customer data:', customer); // Debug log
            // Prepare the data to send - match backend expectations
            const updateData = {
                FNAME: customer!.FNAME,
                LNAME: customer!.LNAME,
                email: customer!.email || customer!.EMAILID, // Backend expects 'email' field
                customerId: parseInt(id!), // Use the URL parameter ID, ensure it's a number
                MOBILE: customer!.MOBILE,
                CADDRESSLINE1: customer!.CADDRESSLINE1,
                CCITY: customer!.CCITY,
                CPINCODE: customer!.CPINCODE,
            };
            console.log('Prepared update data:', updateData); // Debug log
            // Try different possible endpoint patterns
            const response = await axios.put(`http://localhost:3000/updateCustomerInfo/${id}`, updateData);
            // Alternative endpoints to try if above doesn't work:
            // const response = await axios.put(`http://localhost:3000/updatecustomer/${id}`, updateData);
            // const response = await axios.put(`http://localhost:3000/customer/${id}`, updateData);
            // const response = await axios.post(`http://localhost:3000/updateCustomerInfo`, updateData);
            console.log('Update response:', response.data); // Debug log
            alert('Customer updated successfully');
            navigate('/components/Customerl');
        } catch (error: any) {
            console.error('Update error:', error);
            // More detailed error message
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to update customer';
            alert(`Failed to update customer: ${errorMessage}`);
        }
    };
    if (loading) return <div>Loading...</div>;
    if (error || !customer) return <div>{error || 'Customer not found'}</div>;
    return (
        <div className="edit-customer-container">
            <h2>Edit Customer</h2>
        
            <form onSubmit={handleSubmit}>
                <div className="row g-3"> {/* Bootstrap row for grid, g-3 for gutter spacing */}
                    {/* First Column */}
                    <div className="col-md-6"> {/* Takes half width on medium and larger screens, full width on small */}
                        <div className="mb-3"> {/* Margin bottom for spacing between form groups */}
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control" // Bootstrap input styling
                                id="firstName"
                                name="FNAME"
                                value={customer.FNAME}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="LNAME"
                                value={customer.LNAME}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">Mobile</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobile"
                                name="MOBILE"
                                value={customer.MOBILE}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email" // Use 'email' as per interface and updateData
                                value={customer.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Second Column */}
                    <div className="col-md-6"> {/* Takes half width on medium and larger screens, full width on small */}
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="CCITY"
                                value={customer.CCITY}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pincode" className="form-label">Pincode</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pincode"
                                name="CPINCODE"
                                value={customer.CPINCODE}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea // Changed to textarea for multi-line address
                                className="form-control"
                                id="address"
                                name="CADDRESSLINE1"
                                value={customer.CADDRESSLINE1}
                                onChange={(e) => handleChange}
                                rows={3} // Adjust rows as needed
                            ></textarea>
                        </div>
                        {/* The submit button will be placed outside the columns to span full width or align as desired */}
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4"> {/* Align button to the right */}
                    <button type="submit" className="btn btn-success">
                        Update Customer
                    </button>
                </div>
            </form>
        </div>
    );
};
export default EditCustomer;
