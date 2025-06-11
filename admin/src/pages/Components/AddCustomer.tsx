import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

const tabs = ['Personal Details'];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface FormErrors {
    password?: string;
    confirmPassword?: string;
}
export default function AddCustomer() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [formData, setFormData] = useState({
        // FIRMNAME: '',
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
        CADDRESSLINE1: '', // Changed from ADDRESS to CADDRESSLINE1
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
        COUNTRY: '',
        CCOUNTRY: '',
        password: '',
        confirmPassword: '',
    });
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // const validate = () => {
    //   const newErrors: FormErrors = {};

    //   // Email validation
    //   if (!formData.email.trim()) {
    //     newErrors.email = "Email is required";
    //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //     newErrors.email = "Invalid email format";
    //   }

    //   // Password validation
    //   if (!formData.password) {
    //     newErrors.password = "Password is required";
    //   } else if (
    //     !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password)
    //   ) {
    //     newErrors.password = "Incorrect password. Please try again.";
    //   }

    //   // Confirm password validation
    //   if (!formData.confirmPassword) {
    //     newErrors.confirmPassword = "Confirm password is required";
    //   } else if (formData.password !== formData.confirmPassword) {
    //     newErrors.confirmPassword = "Passwords do not match";
    //   }

    //   setErrors(newErrors);
    //   return Object.keys(newErrors).length === 0;
    // };

    const validate = () => {
        const newErrors: FormErrors = {};

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password)) {
            newErrors.password = 'Incorrect password. Please try again.';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            STATUS: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        if (validate()) {
            // alert('Form submitted successfully!');
            // Perform your form submission logic here
        }
        try {
            // Prepare data to match backend expectations
            const customerData = {
                FNAME: formData.FNAME,
                LNAME: formData.LNAME,
                email: formData.email,
                MOBILE: formData.MOBILE,
                CSTATE: formData.CSTATE,
                CCOUNTRY: formData.CCOUNTRY,
                CCITY: formData.CCITY,
                CPINCODE: formData.CPINCODE,
                password: formData.password,
                CADDRESSLINE1: formData.CADDRESSLINE1,
            };

            console.log('Sending customer data:', customerData); // Debug log

            const res = await axios.post('http://localhost:3000/add_customer', customerData);
            console.log('Customer added:', res.data);
            toast.success('Customer saved successfully!');

            // Reset form after successful save
            setFormData({
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
                COUNTRY: '',
                CCOUNTRY: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error: any) {
            console.error('Error saving customer:', error);

            // More detailed error message
            const errorMessage = error.response?.data?.msg || error.response?.data?.message || error.message || 'Failed to save customer';

            toast.error(`Failed to save customer: ${errorMessage}`);
        }
    };

    const handleClick = () => {
        navigate('/components/Customerl');
    };

    const handleReset = () => {
        setFormData({
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
            COUNTRY: '',
            CCOUNTRY: '',
            password: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="p-4 bg-white rounded shadow max-w-7xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Add Customer</h2>
                <button
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleClick}
                >
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
                                    value={formData.FNAME} 
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
                                    value={formData.LNAME} 
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
                                    value={formData.email} 
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
                                    value={formData.MOBILE} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full border p-2 rounded" 
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-medium">Address *</label>
                                <textarea 
                                    name="CADDRESSLINE1" 
                                    value={formData.CADDRESSLINE1} 
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
                    {/* Placeholder Panels */}
                    <Tab.Panel>
                        <form
                            className="grid md:grid-cols-2 gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <div>
                                <label className="block font-medium">First Name</label>
                                <input type="text" name="FNAME" value={formData.FNAME} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="First Name" />
                            </div>
                            <div>
                                <label className="block font-medium">Last Name</label>
                                <input type="text" name="LNAME" value={formData.LNAME} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Last Name" />
                            </div>
                            <div>
                                <label className="block font-medium">Email Address</label>
                                <input type="text" name="email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Email Address" />
                            </div>
                            <div>
                                <label className="block font-medium">Phone No</label>
                                <input type="tel" name="MOBILE" value={formData.MOBILE} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Phone Number" />
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
                                <input type="text" name="CPINCODE" value={formData.CPINCODE} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>

                            <div className="mb-3" style={{ position: 'relative' }}>
                                <label className="block font-medium">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${errors.password ? 'is-invalid' : ''}`}
                                    style={{ paddingRight: '40px' }}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        top: '70%',
                                        right: '15px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        fontSize: '1.3rem',
                                        color: '#777',
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {errors.password && <div style={{ color: 'red', marginTop: '0.25rem' }}>{errors.password}</div>}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-3" style={{ position: 'relative' }}>
                                <label className="block font-medium">Confirm Password</label>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    style={{ paddingRight: '40px' }}
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: 'absolute',
                                        top: '70%',
                                        right: '15px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        fontSize: '1.3rem',
                                        color: '#777',
                                    }}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {errors.confirmPassword && <div style={{ color: 'red', marginTop: '0.25rem' }}>{errors.confirmPassword}</div>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block font-medium">Address</label>
                                <textarea name="CADDRESSLINE1" value={formData.CADDRESSLINE1} onChange={handleChange} className="w-full border p-2 rounded" rows={3}></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Save
                                </button>
                                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </Tab.Panel>
                    {/* <Tab.Panel>
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-medium">Agent</label>
                                <input type="text" name="AGENT" value={formData.AGENT} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Firm Name" />
                            </div>
                            <div>
                                <label className="block font-medium">Email Address</label>
                                <input type="email" name="EMAILID" value={formData.EMAILID} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Email Address" />
                            </div>
                            <div>
                                <label className="block font-medium">Firm Name</label>
                                <input type="text" name="EMAILID" value={formData.FNAME} required className="w-full border p-2 rounded" placeholder="Customer Code" />
                            </div>
                            <div>
                                <label className="block font-medium">Agent Commision</label>
                                <input type="text" name="AGENTCOMISSION" value={formData.AGENTCOMISSION} onChange={handleChange} className="w-full border p-2 rounded" placeholder="GST" />
                            </div>
                            <div>
                                <label className="block font-medium">Phone No*</label>
                                <input type="tel" name="TELEPHONE2" value={formData.TELEPHONE2} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Phone Number" />
                            </div>
                            <div>
                                <label className="block font-medium">State</label>
                                <select name="CSTATE" required className="w-full border p-2 rounded" value={formData.CSTATE} onChange={handleChange}>
                                    <option value="">-- Select state --</option>
                                    <option>Madhya Pradesh</option>
                                  
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium">City</label>
                                <select name="CCITY"  className="w-full border p-2 rounded" value={formData.CCITY} onChange={handleChange}>
                                    <option>select city</option>
                                    <option>Indore</option>
                                   
                                    
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium">Pincode</label>
                                <input type="text" className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-medium">Address</label>
                                <textarea name="CADDRESSLINE2" value={formData.CADDRESSLINE2} onChange={handleChange} className="w-full border p-2 rounded" rows={3}></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button className="bg-green-600 text-white px-6 py-2 rounded">Save</button>
                                <button className="border px-6 py-2 rounded">Reset</button>
                            </div>
                        </form>
                    </Tab.Panel> */}
                    {/* <Tab.Panel>
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-medium">Bank Name</label>
                                <input type="text" name="BANKNAME" value={formData.BANKNAME} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Firm Name" />
                            </div>
                            <div>
                                <label className="block font-medium">Account Type</label>
                                <input type="email" name="ACCOUNTTYPE" value={formData.ACCOUNTTYPE} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Email Address" />
                            </div>
                            <div>
                                <label className="block font-medium">Account Number</label>
                                <input type="text" name="ACCOUNTNO" value={formData.ACCOUNTNO} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Customer Code" />
                            </div>
                            <div>
                                <label className="block font-medium">IFSC Code</label>
                                <input type="text" name="IFSCCODE" value={formData.IFSCCODE} onChange={handleChange} className="w-full border p-2 rounded" placeholder="GST" />
                            </div>
                            <div>
                                <label className="block font-medium">Cheque No*</label>
                                <input type="tel" name="CHEQUENO" value={formData.CHEQUENO} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Phone Number" />
                            </div>
                            <div>
                                <label className="block font-medium">Cheque Remarks</label>
                                <input type="text" name="CHEQUEREMARK" value={formData.CHEQUEREMARK} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div>
                                <label className="block font-medium">MICR Code</label>
                                <input type="text" name="MICRCODE" value={formData.MICRCODE} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div>
                                <label className="block font-medium">Bank Telephone Number</label>
                                <input type="tel" name="TPNOBANK"  value={formData.TPNOBANK} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button className="bg-green-600 text-white px-6 py-2 rounded">Save</button>
                                <button className="border px-6 py-2 rounded">Reset</button>
                            </div>
                        </form>
                    </Tab.Panel> */}
                </Tab.Panels>
            </Tab.Group>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}