import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
interface Item {
    id?: number;
    name: string;
    description: string | null;
    quantity: number;
    price: number;
}
interface CustomerDetails {
    name: string;
    email: string;
    address: string;
    phone: string;
    country: string;
    paymentStatus: string;
}
const OrderEdit: React.FC = () => {
    const { saleId } = useParams<{ saleId: string }>();
    const [items, setItems] = useState<Item[]>([]);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [loading, setLoading] = useState(false);
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        name: '',
        email: '',
        address: '',
        phone: '',
        country: '',
        paymentStatus: '',
    });
    const [invoiceNumber, setInvoiceNumber] = useState('#0001');
    console.log('wewe id', saleId);
    useEffect(() => {
        if (saleId) {
            fetchSalesData();
        }
    }, [saleId]);
    const fetchSalesData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/getSalesMaster/${saleId}`);
            if (response.data?.sales?.[0]) {
                const sale = response.data.sales[0];
                setCustomerDetails({
                    name: sale.NAME,
                    email: sale.EMAIL,
                    address: sale.ADDRESS,
                    phone: sale.NUMBER,
                    country: sale.COUNTRY,
                    paymentStatus: sale.PAYMENTSTATUS,
                });
                setItems(
                    sale.ITEMS?.map((item :any) => ({
                        id: item.ITEMID,
                        name: item.ITEMNAME,
                        description: item.DESCRIPTION,
                        quantity: item.QUANTITY,
                        price: item.AMOUNT,
                    })) || []
                );
            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
            alert('Failed to load order details');
        } finally {
            setLoading(false);
        }
    };
    const calculateSubtotal = () => items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const subtotal = calculateSubtotal();
    const grandTotal = subtotal + (subtotal * tax) / 100 - (subtotal * discount) / 100 + shipping;
    const addItem = () => {
        setItems([...items, { name: '', description: null, quantity: 1, price: 0 }]);
    };
    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };
    const handleItemChange = (index: number, field: keyof Item, value: string | number | null) => {
        const updatedItems = [...items];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: field === 'quantity' || field === 'price' ? Number(value) : value,
        };
        setItems(updatedItems);
    };
    const handleSaveOrder = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/updateSales/${saleId}`, {
                items: items.map((item) => ({
                    ITEMID: item.id,
                    ITEMNAME: item.name,
                    DESCRIPTION: item.description,
                    QUANTITY: item.quantity,
                    AMOUNT: item.price,
                })),
                tax,
                discount,
                shipping,
                customerDetails,
            });
            alert('Order saved successfully!');
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Failed to save order');
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Order #{saleId}</h1>
                <div className="flex space-x-4">
                    <button onClick={handleSaveOrder} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">Send Invoice</button>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">Preview</button>
                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors">Download</button>
                </div>
            </div>
            {/* Invoice Form */}
            <div className="bg-white p-6 shadow-md rounded-md">
                {/* Company Details */}
                <div className="flex justify-between mb-6">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium">Invoice Number</label>
                        <input className="border rounded w-full p-2 mt-1" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                    </div>
                </div>
                {/* Billing & Payment Details */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Bill To */}
                    <div>
                        <h3 className="font-semibold mb-2">Bill To:</h3>
                        <input className="border rounded w-full p-2 mb-2" value={customerDetails.name} onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })} />
                        <input className="border rounded w-full p-2 mb-2" value={customerDetails.email} onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })} />
                        <input className="border rounded w-full p-2 mb-2" value={customerDetails.address} onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })} />
                        <input className="border rounded w-full p-2 mb-2" value={customerDetails.phone} onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })} />
                        <div className="mt-2">
                            <span className="font-medium">Country: </span>
                            <span>{customerDetails.country}</span>
                        </div>
                        <div className="mt-1">
                            <span className="font-medium">Payment Status: </span>
                            <span
                                className={`px-2 py-1 rounded ${
                                    customerDetails.paymentStatus === 'PENDING'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : customerDetails.paymentStatus === 'PAID'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {customerDetails.paymentStatus}
                            </span>
                        </div>
                    </div>
                    {/* Payment Details */}
                    <div>
                        <h3 className="font-semibold mb-2">Payment Details:</h3>
                        <input className="border rounded w-full p-2 mb-2" placeholder="Account Number" />
                        <input className="border rounded w-full p-2 mb-2" placeholder="Bank Name" />
                        <input className="border rounded w-full p-2 mb-2" placeholder="SWIFT Code" />
                        <input className="border rounded w-full p-2 mb-2" placeholder="IBAN" />
                    </div>
                </div>
                {/* Invoice Items */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Item Details</h3>
                    <div className="grid grid-cols-12 gap-2 mb-2 font-medium">
                        <div className="col-span-5">Item Name</div>
                        <div className="col-span-3">Description</div>
                        <div className="col-span-2">Quantity</div>
                        <div className="col-span-1">Price</div>
                        <div className="col-span-1"></div>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
                            <input className="col-span-5 border rounded p-2" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                            <input className="col-span-3 border rounded p-2" value={item.description || ''} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
                            <input className="col-span-2 border rounded p-2" type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                            <input className="col-span-1 border rounded p-2" type="number" min="0" step="0.01" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />
                            <button className="col-span-1 text-red-500 hover:text-red-700" onClick={() => removeItem(index)}>
                                ❌
                            </button>
                        </div>
                    ))}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-2 transition-colors" onClick={addItem}>
                        Add Item
                    </button>
                </div>
                {/* Pricing Details */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Tax (%)</label>
                        <input className="border rounded w-full p-2 mt-1" type="number" min="0" value={tax} onChange={(e) => setTax(Number(e.target.value))} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Discount (%)</label>
                        <input className="border rounded w-full p-2 mt-1" type="number" min="0" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Shipping ($)</label>
                        <input className="border rounded w-full p-2 mt-1" type="number" min="0" step="0.01" value={shipping} onChange={(e) => setShipping(Number(e.target.value))} />
                    </div>
                </div>
                {/* Total Section */}
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Tax ({tax}%):</span>
                        <span>${((subtotal * tax) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Discount ({discount}%):</span>
                        <span>-${((subtotal * discount) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-bold">Grand Total:</span>
                        <span className="text-xl font-bold">${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderEdit;
