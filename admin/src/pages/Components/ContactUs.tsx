import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BASE_URL } from '../../config';

const ContactUs: React.FC = () => {
    const [sectionname, setSectionname] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    useEffect(() => {
        const fetchContactUs = async () => {
            try {
                const response = await fetch(`${BASE_URL}/get-page-info?companyid=1&id=19`);
                const data = await response.json();

                setSectionname(data.sectionname || '');
                setPhone(data.phone || '');
                setEmail(data.email || '');
                setAddress(data.address || '');
            } catch (error) {
                console.error('Error fetching contact us:', error);
            }
        };
        fetchContactUs();
    }, []);

    const handleSave = async () => {
        try {
            const response = await fetch(`${BASE_URL}/save-page-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyid: '1',
                    id: '19',
                    sectionname,
                    phone,
                    email,
                    address,
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert(`${sectionname || 'Contact Us'} saved successfully!`);
            } else {
                alert('Failed to save contact us.');
            }
        } catch (error) {
            console.error('Error saving contact us:', error);
        }
    };

    const handleReset = () => {
        setPhone('');
        setEmail('');
        setAddress('');
    };

    return (
        <div className="privacy-policy-editor">
            <h1 className="mb-3 font-bold">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                {/* Address full-width */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea name="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="form-control w-full border border-gray-300 rounded px-3 py-2" />
                </div>
            </div>
            {/* <div className="mt-4 flex gap-3">
                <Button onClick={handleSave} className="bg-green-500 border-0">
                    Save
                </Button>
                <Button variant="outline" onClick={handleReset}>
                    Reset
                </Button>
            </div> */}

             <div className="mt-4 flex gap-3">
                          <Button onClick={handleSave} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm mt-4 font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Save</Button>
                          <Button  variant="outline" onClick={handleReset} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm mt-4 font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Reset</Button>
                        </div>
        </div>
    );
};

export default ContactUs;