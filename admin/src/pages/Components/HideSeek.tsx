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
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingReorder, setPendingReorder] = useState<any[]>([]);

    // Fetch hometable data
    const fetchHometableData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/get_hometable`, {
                withCredentials: true,
            });
            // Sort by sequence if it exists, otherwise by id
            const sortedData = response.data.sort((a: any, b: any) => {
                return (a.sequence || a.id) - (b.sequence || b.id);
            });
            setHometableData(sortedData);
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

    // Drag and Drop handlers
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Add visual feedback
        (e.target as HTMLElement).style.opacity = '0.5';
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedIndex(null);
        (e.target as HTMLElement).style.opacity = '1';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === dropIndex) {
            return;
        }

        const newData = [...hometableData];
        const draggedItem = newData[draggedIndex];

        // Remove dragged item and insert at new position
        newData.splice(draggedIndex, 1);
        newData.splice(dropIndex, 0, draggedItem);

        // Store the pending reorder and show confirmation
        setPendingReorder(newData);
        setShowConfirmDialog(true);
    };

    // Update display order in backend - FIXED VERSION
    const updateDisplayOrder = async (reorderedData: any[]) => {
        try {
            setLoading(true);

            // Create array of updates with new sequence - this matches backend expectation
            const updates = reorderedData.map((item, index) => ({
                id: item.id,
                sequence: index + 1,
            }));

            console.log('Sending updates to backend:', updates);

            // Send the updates array directly (not wrapped in an object)
            const response = await axios.put(
                `${BASE_URL}/update_hometable_positions`,
                updates, // Send array directly, not { updates }
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            console.log('Backend response:', response.data);

            // Update local state with new sequence
            setHometableData(
                reorderedData.map((item, index) => ({
                    ...item,
                    sequence: index + 1,
                }))
            );

            alert('Layout order updated successfully!');
        } catch (error) {
            console.error('Error updating display order:', error);

            // Enhanced error logging
            // if (error.response) {
            //     console.error('Error response:', error.response.data);
            //     console.error('Error status:', error.response.status);
            // }

            // If batch update fails, try individual updates as fallback
            try {
                console.log('Trying fallback individual updates...');
                for (let i = 0; i < reorderedData.length; i++) {
                    await axios.put(
                        `${BASE_URL}/update_hometable/${reorderedData[i].id}`,
                        {
                            ...reorderedData[i],
                            sequence: i + 1,
                        },
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true,
                        }
                    );
                }

                // Update local state
                setHometableData(
                    reorderedData.map((item, index) => ({
                        ...item,
                        sequence: index + 1,
                    }))
                );

                alert('Layout order updated successfully via fallback!');
            } catch (fallbackError) {
                console.error('Error in fallback update:', fallbackError);
                alert('Error updating layout order. Please try again.');
                // Revert to original order
                fetchHometableData();
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle confirmation dialog
    const handleConfirmReorder = () => {
        updateDisplayOrder(pendingReorder);
        setShowConfirmDialog(false);
        setPendingReorder([]);
    };

    const handleCancelReorder = () => {
        setShowConfirmDialog(false);
        setPendingReorder([]);
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

            {/* Display hometable records in a draggable table */}
            <div className="mt-6 max-w-6xl mx-auto">
                <h3 className="text-lg font-semibold text-center mb-2">Saved Records</h3>
                <p className="text-sm text-gray-600 text-center mb-4">💡 Drag and drop rows to reorder the layout</p>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">⋮⋮</th>
                            <th className="border p-2">Enabled</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Value</th>
                            <th className="border p-2">Sequence</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hometableData.map((item: any, index: number) => (
                            <tr
                                key={item.id}
                                className={`text-center cursor-move hover:bg-gray-50 transition-colors ${draggedIndex === index ? 'opacity-50' : ''}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                {/* Drag handle */}
                                <td className="border p-2 text-gray-400 cursor-move">
                                    <div className="flex justify-center items-center">⋮⋮</div>
                                </td>

                                {/* Checkbox */}
                                <td className="border p-2">
                                    <input
                                        type="checkbox"
                                        checked={item.flag === 1}
                                        onChange={() => {
                                            toggleFlag(item.id);
                                            // Remove the window.location.reload() as it's not needed
                                            window.location.reload();
                                        }}
                                        className="form-checkbox cursor-pointer"
                                    />
                                    <span className="ml-1">{item.flag === 1 ? 'Yes' : 'No'}</span>
                                </td>

                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.flag}</td>
                                <td className="border p-2">{item.sequence || 'N/A'}</td>
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

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Confirm Layout Change</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to change the layout order? This change will be permanent.</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={handleCancelReorder} className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50" disabled={loading}>
                                Cancel
                            </button>
                            <button onClick={handleConfirmReorder} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
                                {loading ? 'Updating...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HideSeek;
