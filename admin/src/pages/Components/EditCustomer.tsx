
// npm install bootstrap bootstrap-icons
import { Tab } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BASE_URL } from '../../config';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

const tabs = ['Personal Details'];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface Customer {
    FNAME: string;
    LNAME: string;
    email: string;
    MOBILE: string;
    CADDRESSLINE1: string;
    // Add all other fields from your customer interface
    [key: string]: any;
}

interface FormErrors {
    password?: string;
    newPassword?: string;
    confirmPassword?: string;
}
export default function EditCustomer() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [NewPassword, setNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<Customer>({
        email: '',
        CUSTOMERCODE: '',
        GSTIN: '',
        MOBILE: '',
        STATE: '',
        CITY: '',
        CPINCODE: '',
        SALEPRICE: '',
        STATUS: '',
        TRANSPORT: '',
        CADDRESSLINE1: '',
        NAME: '',
        FNAME: '',
        LNAME: '',
        EMAILID: '',
        PEMAILID: '',
        AGENT: '',
        MOBILE2: '',
        PSTATE: '',
        PCITY: '',
        PPINCODE: '',
        PADDRESSLINE1: '',
        AGENTCOMISSION: '',
        agentCommission: '',
        agentFirm: '',
        bankName: '',
        accountType: '',
        accountNumber: '',
        ifscCode: '',
        chequeNo: '',
        chequeRemarks: '',
        micrCode: '',
        bankMOBILE: '',
        TELEPHONE2: '',
        CSTATE: '',
        CCITY: '',
        CADDRESSLINE2: '',
        BANKNAME: '',
        ACCOUNTTYPE: '',
        ACCOUNTNO: '',
        IFSCCODE: '',
        CHEQUENO: '',
        CHEQUEREMARK: '',
        MICRCODE: '',
        TPNOBANK: '',
        CCOUNTRY: '',
        NewPassword: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getcustomerbyid/${id}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load customer data');
                setLoading(false);
                console.error('Error fetching customer:', error);
            }
        };

        if (id) {
            fetchCustomer();
        } else {
            setLoading(false);
        }
    }, [id]);
    console.log('Form DataID:', id);
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get('https://countriesnow.space/api/v0.1/countries/positions');
                if (res.data && res.data.data) {
                    setCountries(res.data.data.map((c: any) => c.name));
                }
            } catch (err) {
                console.error('Failed to fetch countries:', err);
            }
        };
        fetchCountries();
    }, []);

    // Fetch states when country is selected
    useEffect(() => {
        const fetchStates = async () => {
            if (!formData.CCOUNTRY) return;
            try {
                const res = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
                    country: formData.CCOUNTRY,
                });
                if (res.data?.data?.states) {
                    setStates(res.data.data.states.map((s: any) => s.name));
                } else {
                    setStates([]);
                }
                setFormData((prev) => ({ ...prev, state: '', city: '' }));
                setCities([]);
            } catch (err) {
                console.error('Failed to fetch states:', err);
            }
        };
        fetchStates();
    }, [formData.CCOUNTRY]);

    // Fetch cities when state is selected
    useEffect(() => {
        const fetchCities = async () => {
            if (!formData.CCOUNTRY || !formData.CSTATE) return;
            try {
                const res = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
                    country: formData.CCOUNTRY,
                    state: formData.CSTATE,
                });
                setCities(res.data.data || []);
                setFormData((prev) => ({ ...prev, city: '' }));
            } catch (err) {
                console.error('Failed to fetch cities:', err);
            }
        };
        fetchCities();
    }, [formData.CSTATE]);
    const validate = () => {
        const newErrors: FormErrors = {};

        if (formData.newPassword && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must be at least 8 characters with one letter, number, and special character';
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = ' confirm Passwords do not match';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log("this is data", name);
    };

    // const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         STATUS: e.target.value,
    //     }));
    // };
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async () => {

        setFormSubmitted(true); // Set form as submitted
        if (!validate()) return;

      
        try {
            validate()
            const response = await axios.put(`${BASE_URL}/updateCustomerInfo/${id}`, formData);
            console.log('Customer updated:', response.data);
            toast.success(response.data.message);

            // toast.success('Customer updated successfully!');
            // navigate('/components/Customerl');
        } catch (error: any) {
            console.error('Error updating customer:', error);
            const errorMessage = error.response?.data?.msg || error.response?.data?.message || error.message || 'Failed to update customer';
            toast.error(`Failed to update customer: ${errorMessage}`);
        }
    };

    const handleClick = () => {
        navigate('/components/Customerl');
    };

    const handleReset = () => {
        // Reset form to original fetched data
        if (id) {
            axios
                .get(`${BASE_URL}/getcustomerbyid/${id}`)

                .then((response) => setFormData(response.data))
                .catch((error) => console.error('Error resetting form:', error));
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="p-4 bg-white rounded shadow max-w-7xl mx-auto">
            {/* ToastContainer MUST be rendered in your component tree for toasts to show */}
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Edit Customer</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleClick}>
                    Customer List
                </button>
            </div>

            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="flex space-x-1 border-b mb-4">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames('px-4 py-2 text-sm font-medium focus:outline-none', selected ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600')
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    {/* COMMERCIAL TAB */}
                    {/* <Tab.Panel>
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-medium">First Name *</label>
                                <input 
                                    type="text" 
                                    name="FNAME" 
                                    value={formData.FNAME || ''} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full border p-2 rounded" 
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Last Name *</label>
                                <input 
                                    type="text" 
                                    name="LNAME" 
                                    value={formData.LNAME || ''} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full border p-2 rounded" 
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Email Address *</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email || formData.EMAILID || ''} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full border p-2 rounded" 
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Mobile No *</label>
                                <input 
                                    type="tel" 
                                    name="MOBILE" 
                                    value={formData.MOBILE || ''} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full border p-2 rounded" 
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-medium">Address *</label>
                                <textarea 
                                    name="CADDRESSLINE1" 
                                    value={formData.CADDRESSLINE1 || ''} 
                                    onChange={handleChange} 
                                    required
                                    className="w-full border p-2 rounded" 
                                    rows={3}
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button 
                                    type="button" 
                                    onClick={handleSubmit} 
                                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                                >
                                    Save
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleReset}
                                    className="border px-6 py-2 rounded hover:bg-gray-50"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </Tab.Panel> */}

                    {/* PERSONAL DETAILS TAB */}
                    <Tab.Panel>
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-medium">First Name</label>
                                <input type="text" name="FNAME" value={formData.FNAME || ''} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Last Name</label>
                                <input type="text" name="LNAME" value={formData.LNAME || ''} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Email Address</label>
                                <input type="text" name="email" value={formData.email || ''} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Phone No</label>
                                <input type="tel" name="MOBILE" value={formData.MOBILE || ''} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Country</label>
                                <select name="CCOUNTRY" value={formData.CCOUNTRY} onChange={handleChange} required className="w-full border p-2 rounded">
                                    <option value="">-- Select country --</option>
                                    {countries.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">State</label>
                                <select name="CSTATE" value={formData.CSTATE} onChange={handleChange} required className="w-full border p-2 rounded">
                                    <option value="">-- Select state --</option>
                                    {states.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium">City</label>
                                <select name="CCITY" value={formData.CCITY} onChange={handleChange} required className="w-full border p-2 rounded">
                                    <option value="">-- Select city --</option>
                                    {cities.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Pincode</label>
                                <input type="text" name="CPINCODE" value={formData.CPINCODE || ''} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>
                         {/* Old Password Field */}
<div className="mb-3 relative">
  <label className="block font-medium">Old Password</label>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      placeholder="Password"
      value={formData.password}
      className="w-full border p-2 rounded pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
    >
      {showPassword ? <FaEye /> : <FaEyeSlash />}
    </button>
  </div>
</div>

{/* New Password Field */}
<div className="mb-3">
  <label className="block font-medium">New Password</label>
  <div className="relative">
    <input
      type={NewPassword ? 'text' : 'password'}
      name="newPassword"
      placeholder="New Password"
      value={formData.newPassword}
      onChange={handleChange}
      className={`w-full border p-2 rounded pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
    />
    <button
      type="button"
      onClick={() => setNewPassword(!NewPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
    >
      {NewPassword ? <FaEye /> : <FaEyeSlash />}
    </button>
  </div>
  {errors.newPassword && (
    <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>
  )}
</div>

{/* Confirm Password Field */}
<div className="mb-3">
  <label className="block font-medium">Confirm Password</label>
  <div className="relative">
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={handleChange}
      className={`w-full border p-2 rounded pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
    >
      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
    </button>
  </div>
  {errors.confirmPassword && (
    <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
  )}
</div>
                            <div className="md:col-span-2">
                                <label className="block font-medium">Address</label>
                                <textarea name="CADDRESSLINE1" value={formData.CADDRESSLINE1 || ''} onChange={handleChange} className="w-full border p-2 rounded" rows={3}></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                                    Save
                                </button>
                                <button type="button" onClick={handleReset} className="border px-6 py-2 rounded hover:bg-gray-50">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
