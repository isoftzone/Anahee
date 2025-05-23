import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';

const DiscountCoupan: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        coupon_code: '',
        status: false,
        valid_from: '',
        valid_to: '',
        minimum_bill_amount: '',
        is_percentage: true,
        discount_value: '',
        max_discount_amount: '',
        redeemed_count: '',
    });

    useEffect(() => {
        const fetchCoupons = async () => {
            if (!id) return;

            try {
                const response = await axios.get(`${BASE_URL}/getcouponsbyid/${id}`);
                if (response.data && response.data.data) {
                    const data = response.data.data;

                    // Format ISO date to YYYY-MM-DD
                    const formatDate = (isoDate: string) => isoDate.split('T')[0];

                    setFormData({
                        coupon_code: data.coupon_code || '',
                        status: !!data.status,
                        valid_from: data.valid_from ? formatDate(data.valid_from) : '',
                        valid_to: data.valid_to ? formatDate(data.valid_to) : '',
                        minimum_bill_amount: data.minimum_bill_amount?.toString() || '',
                        is_percentage: !!data.is_percentage,
                        discount_value: data.discount_value?.toString() || '',
                        max_discount_amount: data.max_discount_amount?.toString() || '',
                        redeemed_count: data.redeemed_count?.toString() || '',
                    });
                }
            } catch (err) {
                console.log(axios.isAxiosError(err) ? err.response?.data?.msg || err.message : 'An unknown error occurred');
            }
        };

        fetchCoupons();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                coupon_code: formData.coupon_code,
                status: formData.status ? 1 : 0,
                valid_from: formData.valid_from,
                valid_to: formData.valid_to,
                minimum_bill_amount: parseFloat(formData.minimum_bill_amount || '0'),
                is_percentage: formData.is_percentage ? 1 : 0,
                discount_value: parseFloat(formData.discount_value || '0'),
                max_discount_amount: parseFloat(formData.max_discount_amount || '0'),
                redeemed_count: parseInt(formData.redeemed_count || '0'),
            };

            if (id) {
                // UPDATE coupon
                await axios.put(`${BASE_URL}/updatecoupons/${id}`, payload);
                //alert('Coupon updated successfully!');
            } else {
                // CREATE coupon
                await axios.post(`${BASE_URL}/addcoupons`, {
                    ...payload,
                    redeemed_count: parseInt(formData.redeemed_count || '0'),
                });
                alert('Coupon created successfully!');
            }

            navigate('/Components/discountcouponlist');
        } catch (error) {
            console.error('Error saving/updating coupon:', error);
            alert('Error saving/updating coupon. Check console.');
        }
    };

    const handleReset = () => {
        setFormData({
            coupon_code: '',
            status: false,
            valid_from: '',
            valid_to: '',
            minimum_bill_amount: '',
            is_percentage: false,
            discount_value: '',
            max_discount_amount: '',
            redeemed_count: '',
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Discount Coupon</h2>
                <button onClick={() => navigate('/Components/discountcouponlist')} className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4">
                    Discount Coupon List
                </button>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="font-semibold">Coupon Code *</label>
                        <input type="text" name="coupon_code" value={formData.coupon_code} onChange={handleChange} placeholder="Enter unique Coupon Code" className="border p-2 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Status *</label>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" name="status" className="hidden" checked={formData.status} onChange={handleChange} />
                            <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${formData.status ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform ${formData.status ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Valid From *</label>
                        <input type="date" name="valid_from" value={formData.valid_from} onChange={handleChange} className="border p-2 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Valid To *</label>
                        <input type="date" name="valid_to" value={formData.valid_to} onChange={handleChange} className="border p-2 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold"> {formData.is_percentage ? "Discount Percentage %" : "Discount Amount"}</label>
                        <input type="number" name="discount_value" value={formData.discount_value} onChange={handleChange} placeholder={formData.is_percentage ? "Enter Percent" : "Enter Amount"} className="border p-2 rounded" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" name="is_percentage" checked={formData.is_percentage} onChange={handleChange} className="w-4 h-4" />
                        <label className="font-semibold">Percentage</label>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Minimum Bill Amount</label>
                        <input
                            type="number"
                            name="minimum_bill_amount"
                            value={formData.minimum_bill_amount}
                            onChange={handleChange}
                            placeholder="Enter Minimum Bill Amount"
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Max Amount To Redeem%</label>
                        <input
                            type="number"
                            name="max_discount_amount"
                            value={formData.max_discount_amount}
                            onChange={handleChange}
                            placeholder="Enter Max Amount To Redeem"
                            className="border p-2 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">No Coupon Redeemed</label>
                        <input type="number" name="redeemed_count" value={formData.redeemed_count} onChange={handleChange} placeholder="No of times coupon redeemed" className="border p-2 rounded" />
                    </div>
                </div>

                <div className="mt-4 flex space-x-4">
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
                        {id?"Update":"Save"}
                    </button>
                    <button onClick={handleReset} className="bg-gray-300 px-4 py-2 rounded">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscountCoupan;
