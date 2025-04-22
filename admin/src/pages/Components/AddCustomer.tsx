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
        FIRMNAME: '',
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
        ADDRESS: '',
        NAME: '',
        FNAME: '',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            STATUS: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:3000/addnewcustomer', formData); // replace with your actual backend URL
            console.log('Customer added:', res.data);
            alert('Customer saved successfully!');
            // Optionally redirect or reset
        } catch (error) {
            console.error('Error saving customer:', error);
            alert('Failed to save customer');
        }
    };

    const handleClick = () => {
        navigate('/components/Customerl');
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
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-medium">Firm Name</label>
                                <input type="text" name="FIRMNAME" value={formData.FIRMNAME} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Email ADDRESS</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Customer Code</label>
                                <input type="text" name="CUSTOMERCODE" value={formData.CUSTOMERCODE} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">GSTIN</label>
                                <input type="text" name="GSTIN" value={formData.GSTIN} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">MOBILE No*</label>
                                <input type="tel" name="MOBILE" value={formData.MOBILE} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">State</label>
                                <select name="state" value={formData.STATE} onChange={handleChange} required className="w-full border p-2 rounded">
                                    <option value="">-- Select state --</option>
                                    <option>Delhi</option>
                                    <option>Maharashtra</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">CITY</label>
                                <select name="CITY" value={formData.CITY} onChange={handleChange} className="w-full border p-2 rounded">
                                    <option>select CITY</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Pincode</label>
                                <input type="text" name="pincode" value={formData.CPINCODE} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Sale Price*</label>
                                <select name="SALEPRICE" value={formData.SALEPRICE} onChange={handleChange} required className="w-full border p-2 rounded">
                                    <option>Online Retail</option>
                                    <option>Wholesale</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">STATUS</label>
                                <div className="flex items-center gap-4 mt-2">
                                    <label className="flex items-center">
                                        <input type="radio" name="STATUS" value="verified" checked={formData.STATUS === 'verified'} onChange={handleRadioChange} className="mr-1" />
                                        Verified
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="STATUS" value="not_verified" checked={formData.STATUS === 'not_verified'} onChange={handleRadioChange} className="mr-1" />
                                        Not Verified
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block font-medium">TRANSPORT</label>
                                <select name="TRANSPORT" value={formData.TRANSPORT} onChange={handleChange} className="w-full border p-2 rounded">
                                    <option>TRANSPORT</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-medium">ADDRESS</label>
                                <textarea name="ADDRESS" value={formData.ADDRESS} onChange={handleChange} className="w-full border p-2 rounded" rows={3}></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded">
                                    Save
                                </button>
                                <button type="reset" className="border px-6 py-2 rounded">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </Tab.Panel>
                    {/* Placeholder Panels */}
                    <Tab.Panel>
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-medium">Full Name</label>
                                <input type="text" value={formData.FNAME} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Firm Name" />
                            </div>
                            <div>
                                <label className="block font-medium">Email Address</label>
                                <input type="email" value={formData.PEMAILID} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Email Address" />
                            </div>
                            <div>
                                <label className="block font-medium">Phone No*</label>
                                <input type="tel" value={formData.MOBILE2} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Phone Number" />
                            </div>
                            <div>
                                <label className="block font-medium">State</label>
                                <select name="STATE" value={formData.PSTATE} onChange={handleChange} required className="w-full border p-2 rounded">
                                    <option value="">-- Select state --</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">City</label>
                                <select name="CITY" value={formData.PCITY} onChange={handleChange} required className="w-full border p-2 rounded">
                                    <option value="">-- Select city --</option>
                                    {/* You would typically map through cities here based on selected state */}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Pincode</label>
                                <input type="text" value={formData.PPINCODE} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-medium">Address</label>
                                <textarea value={formData.PADDRESSLINE1} onChange={handleChange} className="w-full border p-2 rounded" rows={3}></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button className="bg-green-600 text-white px-6 py-2 rounded">Save</button>
                                <button className="border px-6 py-2 rounded">Reset</button>
                            </div>
                        </form>
                    </Tab.Panel>

                    {/* Repeat similar for other Tabs and bind their fields to `formData` */}
                    {/* You can reuse the same `handleChange` and `formData` fields */}

                    {/* PERSONAL DETAILS, AGENT, BANK DETAILS TABS go here... */}
                    {/* Just remember to add their input fields to `formData` above and bind them. */}
                    <Tab.Panel>
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-medium">Agent</label>
                                <input type="text" value={formData.AGENT} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Firm Name" />
                            </div>
                            <div>
                                <label className="block font-medium">Email Address</label>
                                <input type="email" value={formData.EMAILID} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Email Address" />
                            </div>
                            <div>
                                <label className="block font-medium">Firm Name</label>
                                <input type="text" required className="w-full border p-2 rounded" placeholder="Customer Code" />
                            </div>
                            <div>
                                <label className="block font-medium">Agent Commision</label>
                                <input type="text" value={formData.AGENTCOMISSION} onChange={handleChange} className="w-full border p-2 rounded" placeholder="GST" />
                            </div>
                            <div>
                                <label className="block font-medium">Phone No*</label>
                                <input type="tel" value={formData.TELEPHONE2} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Phone Number" />
                            </div>
                            <div>
                                <label className="block font-medium">State</label>
                                <select required className="w-full border p-2 rounded" value={formData.CSTATE} onChange={handleChange}>
                                    <option value="">-- Select state --</option>
                                    <option>Delhi</option>
                                    <option>Maharashtra</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium">City</label>
                                <select className="w-full border p-2 rounded" value={formData.CCITY} onChange={handleChange}>
                                    <option>select city</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium">Pincode</label>
                                <input type="text" className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-medium">Address</label>
                                <textarea value={formData.CADDRESSLINE2} onChange={handleChange} className="w-full border p-2 rounded" rows={3}></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button className="bg-green-600 text-white px-6 py-2 rounded">Save</button>
                                <button className="border px-6 py-2 rounded">Reset</button>
                            </div>
                        </form>
                    </Tab.Panel>
                    <Tab.Panel>
                        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-medium">Bank Name</label>
                                <input type="text" value={formData.BANKNAME} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Firm Name" />
                            </div>
                            <div>
                                <label className="block font-medium">Account Type</label>
                                <input type="email" value={formData.ACCOUNTTYPE} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Email Address" />
                            </div>
                            <div>
                                <label className="block font-medium">Account Number</label>
                                <input type="text" value={formData.ACCOUNTNO} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Customer Code" />
                            </div>
                            <div>
                                <label className="block font-medium">IFSC Code</label>
                                <input type="text" value={formData.IFSCCODE} onChange={handleChange} className="w-full border p-2 rounded" placeholder="GST" />
                            </div>
                            <div>
                                <label className="block font-medium">Cheque No*</label>
                                <input type="tel" value={formData.CHEQUENO} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Phone Number" />
                            </div>
                            <div>
                                <label className="block font-medium">Cheque Remarks</label>
                                <input type="text" value={formData.CHEQUEREMARK} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div>
                                <label className="block font-medium">MICR Code</label>
                                <input type="text" value={formData.MICRCODE} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div>
                                <label className="block font-medium">Bank Telephone Number</label>
                                <input type="tel" value={formData.TPNOBANK} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Pincode" />
                            </div>
                            <div className="md:col-span-2 flex gap-2 mt-2">
                                <button className="bg-green-600 text-white px-6 py-2 rounded">Save</button>
                                <button className="border px-6 py-2 rounded">Reset</button>
                            </div>
                        </form>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
