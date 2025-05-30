import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const tabs = ['Commercial Details', 'Personal Details', 'Agent', 'Bank Details'];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function AddCustomer() {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [formData, setFormData] = useState({
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
    });

    const [errors, setErrors] = useState({
        FNAME: '',
        LNAME: '',
        email: '',
        MOBILE: '',
        CADDRESSLINE1: ''
    });

    const validateField = (name: string, value: string) => {
        let error = '';
        
        switch (name) {
            case 'FNAME':
            case 'LNAME':
                if (!value.trim()) {
                    error = 'This field is required';
                } else if (!/^[a-zA-Z ]+$/.test(value)) {
                    error = 'Only letters and spaces allowed';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Invalid email format';
                }
                break;
            case 'MOBILE':
                if (!value.trim()) {
                    error = 'Mobile number is required';
                } else if (!/^[0-9]{10}$/.test(value)) {
                    error = 'Mobile must be 10 digits';
                }
                break;
            case 'CADDRESSLINE1':
                if (!value.trim()) {
                    error = 'Address is required';
                } else if (value.length < 10) {
                    error = 'Address too short';
                }
                break;
            default:
                break;
        }
        
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // Validate the field
        const error = validateField(name, value);
        
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
        
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {...errors};
        
        // Validate all required fields
        const requiredFields: (keyof typeof formData)[] = ['FNAME', 'LNAME', 'email', 'MOBILE', 'CADDRESSLINE1'];
        
        requiredFields.forEach(field => {
            const error = validateField(field, formData[field]);
            newErrors[field] = error;
            if (error) isValid = false;
        });
        
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            alert('Please fix the errors in the form');
            return;
        }

        try {
            const customerData = {
                FNAME: formData.FNAME,
                LNAME: formData.LNAME,
                MOBILE: formData.MOBILE,
                email: formData.email,
                CADDRESSLINE1: formData.CADDRESSLINE1
            };
            
            console.log('Sending customer data:', customerData);
            const res = await axios.post('http://localhost:3000/add_customer', customerData);
            console.log('Customer added:', res.data);
            alert('Customer saved successfully!');
            
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
            });
        } catch (error: any) {
            console.error('Error saving customer:', error);
            const errorMessage = error.response?.data?.msg ||
                               error.response?.data?.message ||
                               error.message ||
                               'Failed to save customer';
            alert(`Failed to save customer: ${errorMessage}`);
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
        });
        setErrors({
            FNAME: '',
            LNAME: '',
            email: '',
            MOBILE: '',
            CADDRESSLINE1: ''
        });
    };

    return (
        <div className="p-4 bg-white rounded shadow max-w-7xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Add Customer</h2>
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
                    <Tab.Panel>
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                            <div>
                                <label className="block font-medium">First Name *</label>
                                <input
                                    type="text"
                                    name="FNAME"
                                    value={formData.FNAME}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border p-2 rounded ${errors.FNAME ? 'border-red-500' : ''}`}
                                />
                                {errors.FNAME && <p className="text-red-500 text-sm mt-1">{errors.FNAME}</p>}
                            </div>
                            <div>
                                <label className="block font-medium">Last Name *</label>
                                <input
                                    type="text"
                                    name="LNAME"
                                    value={formData.LNAME}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border p-2 rounded ${errors.LNAME ? 'border-red-500' : ''}`}
                                />
                                {errors.LNAME && <p className="text-red-500 text-sm mt-1">{errors.LNAME}</p>}
                            </div>
                            <div>
                                <label className="block font-medium">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block font-medium">Mobile No *</label>
                                <input
                                    type="tel"
                                    name="MOBILE"
                                    value={formData.MOBILE}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border p-2 rounded ${errors.MOBILE ? 'border-red-500' : ''}`}
                                    maxLength={10}
                                />
                                {errors.MOBILE && <p className="text-red-500 text-sm mt-1">{errors.MOBILE}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-medium">Address *</label>
                                <textarea
                                    name="CADDRESSLINE1"
                                    value={formData.CADDRESSLINE1}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border p-2 rounded ${errors.CADDRESSLINE1 ? 'border-red-500' : ''}`}
                                    rows={3}
                                ></textarea>
                                {errors.CADDRESSLINE1 && <p className="text-red-500 text-sm mt-1">{errors.CADDRESSLINE1}</p>}
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button
                                    type="submit"
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
                    </Tab.Panel>
                    {/* Placeholder Panels */}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}