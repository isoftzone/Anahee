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
  const [errors, setErrors] = useState<Partial<Customer>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getcustomerbyid/${id}`);
        setCustomer(response.data);
        setLoading(false);
      } catch (error: any) {
        setError('Failed to load customer');
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (customer) {
      const { name, value } = e.target;
      setCustomer(prev => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const validate = (): boolean => {
    if (!customer) return false;

    const newErrors: Partial<Customer> = {};

    if (!customer.FNAME?.trim()) newErrors.FNAME = 'First name is required.';
    if (!customer.LNAME?.trim()) newErrors.LNAME = 'Last name is required.';
    if (!customer.email && !customer.EMAILID) {
      newErrors.email = 'Email is required.';
    } else if (
      (customer.email || customer.EMAILID) &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email || customer.EMAILID)
    ) {
      newErrors.email = 'Invalid email address.';
    }

    if (customer.MOBILE && !/^\d{10}$/.test(customer.MOBILE)) {
      newErrors.MOBILE = 'Mobile must be 10 digits.';
    }

    if (customer.CPINCODE && !/^\d{6}$/.test(customer.CPINCODE.toString())) {
      newErrors.CPINCODE = 'Pincode must be 6 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const updateData = {
        FNAME: customer!.FNAME,
        LNAME: customer!.LNAME,
        email: customer!.email || customer!.EMAILID,
        customerId: parseInt(id!),
        MOBILE: customer!.MOBILE,
        CADDRESSLINE1: customer!.CADDRESSLINE1,
        CCITY: customer!.CCITY,
        CPINCODE: customer!.CPINCODE,
      };

      const response = await axios.put(`http://localhost:3000/updateCustomerInfo/${id}`, updateData);
      alert('Customer updated successfully');
      navigate('/components/Customerl');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to update customer';
      alert(`Failed to update customer: ${errorMessage}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !customer) return <div>{error || 'Customer not found'}</div>;

  return (
    <div className="container">
      <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
      <form className="form-group w-full p-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                name="FNAME"
                value={customer.FNAME || ''}
                onChange={handleChange}
                className={`form-control w-full border ${errors.FNAME ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                required
              />
              {errors.FNAME && <p className="text-red-500 text-sm">{errors.FNAME}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                name="LNAME"
                value={customer.LNAME || ''}
                onChange={handleChange}
                className={`form-control w-full border ${errors.LNAME ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                required
              />
              {errors.LNAME && <p className="text-red-500 text-sm">{errors.LNAME}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile</label>
              <input
                name="MOBILE"
                value={customer.MOBILE || ''}
                onChange={handleChange}
                className={`form-control w-full border ${errors.MOBILE ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`} required
              />
              {errors.MOBILE && <p className="text-red-500 text-sm">{errors.MOBILE}</p>}
            </div>
            {/* <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                name="CCITY"
                value={customer.CCITY || ''}
                onChange={handleChange}
                className="form-control w-full border border-gray-300 rounded px-3 py-2" required
              />
            </div> */}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                name="CPINCODE"
                value={customer.CPINCODE || ''}
                onChange={handleChange}
                className={`form-control w-full border ${errors.CPINCODE ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`} required
              />
              {errors.CPINCODE && <p className="text-red-500 text-sm">{errors.CPINCODE}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={customer.email || customer.EMAILID || ''}
                onChange={handleChange}
                className={`form-control w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`} required
                
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                name="CADDRESSLINE1"
                value={customer.CADDRESSLINE1 || ''}
                onChange={handleChange}
                className="form-control w-full border border-gray-300 rounded px-3 py-2" required
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Update Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
