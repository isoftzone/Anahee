import React, { useState, useEffect } from 'react';
// import './CustomerList.css'; // Create this CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
interface Customer {
  COMPANYID: number;
  FIRMNAME: string;
  EMAILID: string;
  CUSTOMERID: number | string;
  GSTIN?: string;
  CMOBILE?: string;
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
      //  console.log(response)
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
    // Simulate fetching data from an API
    // setTimeout(() => {
    //   const mockData: Customer[] = [
    //     { Sr_no: 1, FirmNAME: 'Ram brite', EMail: 'ram@gmail.com', CustomerCode: 110, GSTNo: '1246578', PhoneNo: '7894561230', City: 'Indore', State: 'mp', Pincode: 452011, SalePrice: 2.00, Status: 1, Transport: '...', Address: 'Indore', NAME: '...', email: '...' },
    //     { Sr_no: 2, FirmNAME: 'Ram brite', EMail: 'rambrite@gmail.com', CustomerCode: 1214, GSTNo: '1234', PhoneNo: '145620', City: 'Bhavnagar', State: '12', Pincode: 522100, SalePrice: 'Online Wholesale Prepaid', Status: 1, Transport: '...', Address: 'Gujarat', NAME: 'Ram bria', email: 'ramk@gmail.c' },
    //     { Sr_no: 3, FirmNAME: 'hghgf', EMail: 'ram@gmail.com', CustomerCode: 1214, GSTNo: '4F456123', PhoneNo: '7894561230', City: 'Hassanpur', State: '13', Pincode: 698541, SalePrice: 'Online Wholesale Prepaid', Status: 1, Transport: '...', Address: 'Indore', NAME: 'Web', email: 'developer@g' },
    //     { Sr_no: 4, FirmNAME: 'team', EMail: 'team@gmail.com', CustomerCode: 114, GSTNo: '145', PhoneNo: '7894561230', City: 'Bangalore', State: 'Karnataka', Pincode: 0, SalePrice: 'Offline Wholesale', Status: 1, Transport: '...', Address: 'Indore', NAME: 'dascsd', email: 'team@gmai.' },
    //     { Sr_no: 7, FirmNAME: 'ram', EMail: 'ram@gmail.com', CustomerCode: 11, GSTNo: '123', PhoneNo: '123456', City: 'select city', State: '- Select state -', Pincode: 0, SalePrice: 'Offline Wholesale', Status: 1, Transport: 'Ram', Address: '', NAME: 'Ram', email: '' },
    //     { Sr_no: 8, FirmNAME: 'Hardev Stationery', EMail: '', CustomerCode: '', GSTNo: '', PhoneNo: '', City: 'select city', State: '- Select state -', Pincode: 0, SalePrice: '', Status: 1, Transport: 'transport', Address: '', NAME: '', email: '' },
    //     { Sr_no: 9, FirmNAME: 'Swama Store', EMail: '', CustomerCode: '', GSTNo: '570651655', PhoneNo: '', City: 'select city', State: '- Select state -', Pincode: 0, SalePrice: '', Status: 1, Transport: 'transport', Address: '', NAME: '', email: '' },
    //   ];
    //   setCustomers(mockData);
    //   setLoading(false);
    // }, 1000); // Replace with actual API call
  }, []);
  if (loading) {
    return <div>Loading customers...</div>;
  }
  if (error) {
    return <div>Error loading customers: {error}</div>;
  }
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
              <th>Firm Name</th>
              <th>E-Mail</th>
              <th>Customer Code</th>
              <th>GST No.</th>
              <th>Phone No.</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Sale Price</th>
              <th>Status</th>
              <th>Transport</th>
              <th>Address</th>
              <th>NAME</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.COMPANYID}>
                <td>{customer.COMPANYID}</td>
                <td>{customer.FIRMNAME}</td>
                <td>{customer.EMAILID}</td>
                <td>{customer.CUSTOMERID}</td>
                <td>{customer.GSTIN}</td>
                <td>{customer.CMOBILE}</td>
                <td>{customer.CCITY}</td>
                <td>{customer.STATE}</td>
                <td>{customer.CPINCODE}</td>
                <td>{customer.SALEPRICE}</td>
                <td>{customer.STATUS}</td>
                <td>{customer.TRANSPORT}</td>
                <td>{customer.CADDRESSLINE1}</td>
                <td>{customer.NAME}</td>
                <td>{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CustomersL;