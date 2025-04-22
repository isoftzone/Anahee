import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import IconPencil from '../../components/Icon/IconPencil';
import Setting from './../../components/Layouts/Setting';

const HideSeek = () => {
    const [companyid] = useState(1001);
    const [remark] = useState('hello');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [hometableData, setHometableData] = useState<any[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch hometable data
    const fetchHometableData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/get_hometable`, {
                withCredentials: true,
            });
            setHometableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Handle flag toggle
    const toggleFlag = useCallback(
        async (id: number) => {
            try {
                // Find the item to be updated
                const item = hometableData.find((item) => item.id === id);
                if (!item) return;

                // Toggle the flag locally
                const updatedFlag = !item.flag;

                // Update the flag in the backend
                await axios.put(
                    `${BASE_URL}/update_hometable/${id}`,
                    { flag: updatedFlag }, // Send the updated flag value
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                );

                // Update the local state
                setHometableData((prevData) => prevData.map((item) => (item.id === id ? { ...item, flag: updatedFlag } : item)));
            } catch (error) {
                console.error('Error toggling flag:', error);
            }
        },
        [hometableData]
    );

    // Submit Form
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = { companyid, remark, name, value, flag: !!value };
            console.log(data);
            if (editId) {
                await axios.put(`${BASE_URL}/update_hometable/${editId}`, data, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            } else {
                await axios.post(`${BASE_URL}/add_hometable`, data, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            }
            fetchHometableData();
            resetForm();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Edit a record
    const editRecord = (item: any) => {
        setEditId(item.id);
        setName(item.name);
        setValue(item.value);
    };

    // Reset form
    const resetForm = () => {
        setName('');
        setValue('');
        setEditId(null);
    };

    useEffect(() => {
        fetchHometableData();
    }, [fetchHometableData]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-center">Layout Setting</h2>

            {/* Form */}
            <form onSubmit={submitForm} className="max-w-lg mx-auto space-y-4">
                <div>
                    <label className="block">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" className="form-input w-full" />
                </div>

                <div>
                    <label className="block">Value</label>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter Value" className="form-input w-full" />
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? 'Saving...' : editId ? 'Update' : 'Save'}
                </button>
            </form>

            {/* Display hometable records in a table */}
            <div className="mt-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-center mb-2">Saved Records</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Enabled</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Value</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hometableData.map((item: any) => (
                            <tr key={item.id} className="text-center">
                                {/* Checkbox inside table */}
                                {/* <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={item.flag}
                    onChange={() => toggleFlag(item.id)}
                    className="form-checkbox cursor-pointer"
                  />
                </td> */}
                                <td className="border p-2">
                                    <input
                                        type="checkbox"
                                        checked={item.flag === 1} // Ensures checkbox is checked when flag is 1
                                        onChange={() => {
                                            toggleFlag(item.id); // Calls the toggle function on change
                                            window.location.reload(); // Reloads the page
                                        }}
                                        className="form-checkbox cursor-pointer"
                                    />
                                    <span>{item.flag === 1 ? 'Yes' : 'No'}</span> {/* Shows Yes or No */}
                                </td>

                                <td className="border p-2">{item.name}</td>
                                {/* <td className="border p-2">{item.value}</td> */}
                                <td className="border p-2">{item.flag}</td>
                                <td className="border p-2 text-center">
                                    <Tippy content="Edit">
                                        <button type="button" onClick={() => editRecord(item)}>
                                            <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                        </button>
                                    </Tippy>
                                    <Tippy content="Delete">
                                        <button type="button" className="ml-2">
                                            <svg viewBox="0 0 24 24" className="w-6 h-6">
                                                {/* Add delete SVG path */}
                                            </svg>
                                        </button>
                                    </Tippy>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HideSeek;
