import React, { useState, useEffect, useRef } from 'react';
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
    payment_mode: string;
}

interface SalesMasterData {
    COMPANYID: number;
    FINYEAR: number;
    SERIES: string;
    SALEDATE: string;
    TMODE: string;
    CUSTOMERID: number;
    TOTALAMOUNT: number;
    DISCAMOUNT: number;
    NETAMOUNT: number;
    AMOUNTPAID: number;
    BALANCE: number;
}

const OrderAdd: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        name: '',
        email: '',
        address: '',
        phone: '',
        country: '',
        paymentStatus: '',
        payment_mode: '',
    });

    // Add the salesMasterData state
    const [salesMasterData, setSalesMasterData] = useState<SalesMasterData>({
        COMPANYID: 1,
        FINYEAR: new Date().getFullYear(),
        SERIES: 'INV',
        SALEDATE: new Date().toISOString().split('T')[0],
        TMODE: 'CASH',
        CUSTOMERID: 1,
        TOTALAMOUNT: 0,
        DISCAMOUNT: 0,
        NETAMOUNT: 0,
        AMOUNTPAID: 0,
        BALANCE: 0,
    });

    const [invoiceNumber, setInvoiceNumber] = useState(Math.floor(Math.random() * 100) + 1);

    const calculateSubtotal = () => items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const subtotal = calculateSubtotal();
    const grandTotal = subtotal + (subtotal * tax) / 100 - discount + shipping;

    const addItem = () => {
        setItems([...items, { name: '', description: null, quantity: 1, price: 0 }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof Item, value: string | number | null) => {
        const adddItems = [...items];
        adddItems[index] = {
            ...adddItems[index],
            [field]: field === 'quantity' || field === 'price' ? Number(value) : value,
        };
        setItems(adddItems);
    };

    const handleSaveOrder = async () => {
        try {
            setLoading(true);

            // Calculate totals
            const subtotal = calculateSubtotal();
            const taxAmount = (subtotal * tax) / 100;
            const discountAmount = discount;
            const totalAmount = subtotal + taxAmount;
            const netAmount = totalAmount - discountAmount + shipping;

            // Prepare the data structure expected by your controller
            const addData = {
                items: items.map((item) => ({
                    ITEMID: item.id || null,
                    ITEMNAME: item.name,
                    DESCRIPTION: item.description,
                    QUANTITY: item.quantity,
                    AMOUNT: item.price,
                })),
                tax: tax,
                discount: discount,
                shipping: shipping,
                customerDetails: {
                    ...salesMasterData, // Use the stored sales master data
                    ITEMQTY: items.reduce((sum, item) => sum + item.quantity, 0),
                    TOTALAMOUNT: totalAmount,
                    DISCAMOUNT: discountAmount,
                    NETAMOUNT: netAmount,
                    AMOUNTPAID: customerDetails.paymentStatus === 'PAID' ? netAmount : 0,
                    BALANCE: customerDetails.paymentStatus === 'PAID' ? 0 : netAmount,
                },
            };

            await axios.put(`${BASE_URL}/addSales`, addData);
            alert('Order addd successfully!');
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Failed to save order');
        } finally {
            setLoading(false);
        }
    };

    // Generate PDF content as HTML string
    const generateInvoiceHTML = () => {
        const currentDate = new Date().toLocaleDateString();

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Invoice ${invoiceNumber}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
                    .customer-details, .payment-details { width: 45%; }
                    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    .items-table th { background-color: #f5f5f5; }
                    .totals { float: right; width: 300px; }
                    .totals div { display: flex; justify-content: space-between; margin-bottom: 5px; }
                    .grand-total { border-top: 2px solid #333; padding-top: 10px; font-weight: bold; font-size: 18px; }
                    .status-badge { padding: 4px 8px; border-radius: 4px; }
                    .status-pending { background-color: #fef3c7; color: #92400e; }
                    .status-paid { background-color: #d1fae5; color: #065f46; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>INVOICE</h1>
                    <h2>Invoice #${invoiceNumber}</h2>
                    <p>Date: ${currentDate}</p>
                </div>
                
                <div class="invoice-details">
                    <div class="customer-details">
                        <h3>Bill To:</h3>
                        <p><strong>${customerDetails.name}</strong></p>
                        <p>${customerDetails.email}</p>
                        <p>${customerDetails.address}</p>
                        <p>${customerDetails.phone}</p>
                        <p>${customerDetails.country}</p>
                        <p>Payment Status: <span class="status-badge ${customerDetails.paymentStatus === 'PAID' ? 'status-paid' : 'status-pending'}">${customerDetails.paymentStatus}</span></p>
                    </div>
                </div>
                
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items
                            .map(
                                (item) => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.description || ''}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td>$${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        `
                            )
                            .join('')}
                    </tbody>
                </table>
                
                <div class="totals">
                    <div><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
                    <div><span>Tax (${tax}%):</span><span>$${((subtotal * tax) / 100).toFixed(2)}</span></div>
                    <div><span>Discount (${discount}%):</span><span>-$${discount.toFixed(2)}</span></div>
                    <div><span>Shipping:</span><span>$${shipping.toFixed(2)}</span></div>
                    <div class="grand-total"><span>Grand Total:</span><span>$${grandTotal.toFixed(2)}</span></div>
                </div>
            </body>
            </html>
        `;
    };

    // Send Invoice via Email
    const handleSendInvoice = async () => {
        try {
            setLoading(true);

            // First save the current state
            await handleSaveOrder();

            // Generate invoice content
            const invoiceHTML = generateInvoiceHTML();

            // Create a blob with the HTML content
            const blob = new Blob([invoiceHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            // Create a download link
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice_${invoiceNumber}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Open email client after a short delay
            setTimeout(() => {
                const subject = `Invoice #${invoiceNumber} from Your Company`;
                const body = `Please find attached invoice #${invoiceNumber}.`;
                const mailtoLink = `mailto:${customerDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoLink;
            }, 1000);

            alert('The invoice has been downloaded. Please attach it to your email.');
        } catch (error) {
            console.error('Error preparing invoice email:', error);
            alert('Failed to prepare invoice email');
        } finally {
            setLoading(false);
        }
    };

    // Preview Invoice
    const handlePreview = () => {
        setShowPreview(true);
    };

    // Download Invoice as PDF
    const handleDownload = () => {
        const invoiceHTML = generateInvoiceHTML();
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write(invoiceHTML);
            newWindow.document.close();

            // Trigger print dialog for PDF save
            setTimeout(() => {
                newWindow.print();
            }, 1000);
        }
    };

    // Alternative download method using blob
    const handleDownloadAlternative = () => {
        const invoiceHTML = generateInvoiceHTML();
        const blob = new Blob([invoiceHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice-${invoiceNumber}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
                <h1 className="text-2xl font-bold">Add Order</h1>
                <div className="flex space-x-4">
                    <button onClick={handleSaveOrder} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={handleSendInvoice} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors" disabled={loading}>
                        Send Invoice
                    </button>
                    <button onClick={handlePreview} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
                        Preview
                    </button>
                    <button onClick={handleDownload} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors">
                        Download
                    </button>
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold">Invoice Preview</h2>
                            <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                                ×
                            </button>
                        </div>
                        <div className="p-6" dangerouslySetInnerHTML={{ __html: generateInvoiceHTML() }} />
                        <div className="flex justify-end space-x-4 p-4 border-t">
                            <button onClick={() => setShowPreview(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
                                Close
                            </button>
                            <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoice Form */}
            <div className="bg-white p-6 shadow-md rounded-md">
                {/* Company Details */}
                <div className="flex justify-between mb-6">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium">Invoice Number</label>
                        <input
                            type="text"
                            className="border rounded w-full p-2 mt-1"
                            value={invoiceNumber}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Allow only digits (or empty string)
                                if (/^\d*$/.test(value)) {
                                   setInvoiceNumber(Number(value));
                                }
                            }}
                        />
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
                    </div>

                    {/* Payment Details */}
                    <div>
                        <div className="mb-2">
                            <label className="font-semibold">Payment Mode:</label>
                            <input
                                className="border rounded w-full p-2"
                                value={customerDetails.payment_mode}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, payment_mode: e.target.value })}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Payment Status:</label>
                            <input
                                className="border rounded w-full p-2"
                                value={customerDetails.paymentStatus}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, paymentStatus: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Invoice Items */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Item Details</h3>
                    <div className="grid grid-cols-12 gap-2 mb-2 font-medium">
                        <div className="col-span-4">Item Name</div>
                        <div className="col-span-3">Description</div>
                        <div className="col-span-1">Quantity</div>
                        <div className="col-span-1">Price</div>
                        <div className="col-span-1">Total</div>
                        <div className="col-span-1">Delete</div>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
                            <input className="col-span-4 border rounded p-2" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                            <input className="col-span-3 border rounded p-2" value={item.description || ''} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
                            <input className="col-span-1 border rounded p-2" type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                            <input className="col-span-1 border rounded p-2" type="number" min="0" step="0.01" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />
                            <input
                                className="col-span-1 border rounded p-2"
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.price * item.quantity}
                                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            />
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
                        <label className="block text-sm font-medium">Tax</label>
                        <input className="border rounded w-full p-2 mt-1" type="number" min="0" value={tax} onChange={(e) => setTax(Number(e.target.value))} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Discount</label>
                        <input className="border rounded w-full p-2 mt-1" type="number" min="0" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Shipping</label>
                        <input className="border rounded w-full p-2 mt-1" type="number" min="0" step="0.01" value={shipping} onChange={(e) => setShipping(Number(e.target.value))} />
                    </div>
                </div>

                {/* Total Section */}
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span className="font-medium">{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Tax ({tax}%):</span>
                        <span>{((subtotal * tax) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Discount Amount:</span>
                        <span>-{discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping:</span>
                        <span>{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-bold">Grand Total:</span>
                        <span className="text-xl font-bold">{grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderAdd;
