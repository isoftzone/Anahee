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
    image: string;
}

interface CustomerDetails {
    name: string;
    email: string;
    address: string;
    phone: string;
    country: string;
    paymentStatus: string;
    payment_mode: string;
    ORDER_STATUS: string;
    coupon_code: string;
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

interface Product {
    id: string;
    name: string;
    shortDescription: string;
    price: number;
    image: string;
}

const OrderEdit: React.FC = () => {
    const { saleId } = useParams<{ saleId: string }>();
    const [items, setItems] = useState<Item[]>([]);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        name: '',
        email: '',
        address: '',
        phone: '',
        country: '',
        paymentStatus: '',
        payment_mode: '',
        ORDER_STATUS: '',
        coupon_code: '',
    });

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

    const [invoiceNumber, setInvoiceNumber] = useState(saleId);

    useEffect(() => {
        if (saleId) {
            fetchSalesData();
        }
        fetchProducts();
    }, [saleId]);

     const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getallitems`);
            if (response.data?.success) {
                const transformedProducts = response.data.data.map((product: any) => ({
                    id: product.id,
                    name: product.name,
                    shortDescription: product.shortDescription,
                    price: product.price,
                    image:product.image[0]
                }));
                setProducts(transformedProducts);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

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
                    payment_mode: sale.PAYMENTMETHOD,
                    ORDER_STATUS: sale.ORDER_STATUS,
                    coupon_code: sale.coupon_code,
                });

                setItems(
                    sale.ITEMS?.map((item: any) => ({
                        id: item.ITEMID,
                        name: item.ITEMNAME,
                        description: item.DESCRIPTION,
                        quantity: item.QUANTITY,
                        price: item.AMOUNT,
                    })) || []
                );

                setSalesMasterData({
                    COMPANYID: sale.COMPANYID || 1,
                    FINYEAR: sale.FINYEAR || new Date().getFullYear(),
                    SERIES: sale.SERIES || 'INV',
                    SALEDATE: sale.SALEDATE || new Date().toISOString().split('T')[0],
                    TMODE: sale.TMODE || 'CASH',
                    CUSTOMERID: sale.CUSTOMERID || 1,
                    TOTALAMOUNT: sale.TOTALAMOUNT || 0,
                    DISCAMOUNT: sale.DISCAMOUNT || 0,
                    NETAMOUNT: sale.NETAMOUNT || 0,
                    AMOUNTPAID: sale.AMOUNTPAID || 0,
                    BALANCE: sale.BALANCE || 0,
                });

                setTax(sale.TAX || 0);
                setDiscount(sale.DISCAMOUNT || 0);
                setShipping(sale.shipping_charge || 0);
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
    const grandTotal = subtotal + (subtotal * tax) / 100 - discount + shipping;

    const addItem = () => {
        setItems([...items, { name: '', description: null, quantity: 1, price: 0,image:'' }]);
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

     const handleProductSelect = (index: number, productName: string) => {
        const selectedProduct = products.find(p => p.name === productName);
        if (selectedProduct) {
            const updatedItems = [...items];
            updatedItems[index] = {
                ...updatedItems[index],
                id: Number(selectedProduct.id),
                name: selectedProduct.name,
                description: selectedProduct.shortDescription,
                price: selectedProduct.price,
                image:selectedProduct.image
            };
            setItems(updatedItems);
        }
    };

    const handleSaveOrder = async () => {
        try {
            setLoading(true);

            const subtotal = calculateSubtotal();
            const taxAmount = (subtotal * tax) / 100;
            const discountAmount = discount;
            const totalAmount = subtotal + taxAmount;
            const netAmount = totalAmount - discountAmount + shipping;

            const updateData = {
                items: items.map((item) => ({
                    ITEMID: item.id || null,
                    ITEMNAME: item.name,
                    DESCRIPTION: item.description,
                    QUANTITY: item.quantity,
                    AMOUNT: item.price,
                    image: item.image
                })),
                tax: tax,
                discount: discount,
                shipping: shipping,
                customerDetails: {
                    ...salesMasterData,
                    ITEMQTY: items.reduce((sum, item) => sum + item.quantity, 0),
                    TOTALAMOUNT: totalAmount,
                    DISCAMOUNT: discountAmount,
                    NETAMOUNT: netAmount,
                    AMOUNTPAID: customerDetails.paymentStatus === 'PAID' ? netAmount : 0,
                    BALANCE: customerDetails.paymentStatus === 'PAID' ? 0 : netAmount,
                    paymentStatus: customerDetails.paymentStatus,
                    payment_mode: customerDetails.payment_mode,
                    ORDER_STATUS: customerDetails.ORDER_STATUS,
                    coupon_code: customerDetails.coupon_code,
                    name:customerDetails.name,
                    email:customerDetails.email
                },
            };

            await axios.put(`${BASE_URL}/updateSales/${saleId}`, updateData);
            alert('Order updated successfully!');
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Failed to save order');
        } finally {
            setLoading(false);
        }
    };

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
                    <div><span>Subtotal:</span><span>₹${subtotal.toFixed(2)}</span></div>
                    <div><span>Tax (${tax}%):</span><span>$${((subtotal * tax) / 100).toFixed(2)}</span></div>
                    <div><span>Discount (${discount}%):</span><span>-₹${discount.toFixed(2)}</span></div>
                    <div><span>Shipping:</span><span>₹${shipping.toFixed(2)}</span></div>
                    <div class="grand-total"><span>Grand Total:</span><span>$${grandTotal.toFixed(2)}</span></div>
                </div>
            </body>
            </html>
        `;
    };

    const handleSendInvoice = async () => {
        try {
            setLoading(true);
            await handleSaveOrder();

            const invoiceHTML = generateInvoiceHTML();
            const blob = new Blob([invoiceHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice_${invoiceNumber}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

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

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleDownload = () => {
        const invoiceHTML = generateInvoiceHTML();
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write(invoiceHTML);
            newWindow.document.close();

            setTimeout(() => {
                newWindow.print();
            }, 1000);
        }
    };

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
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-xl md:text-2xl font-bold">Edit Order {saleId}</h1>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <button
                        onClick={handleSaveOrder}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md transition-colors text-sm md:text-base"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={handleSendInvoice}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md transition-colors text-sm md:text-base"
                        disabled={loading}
                    >
                        Send Invoice
                    </button>
                    <button onClick={handlePreview} className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md transition-colors text-sm md:text-base">
                        Preview
                    </button>
                    <button onClick={handleDownload} className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 md:px-4 md:py-2 rounded-md transition-colors text-sm md:text-base">
                        Download
                    </button>
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold">Invoice Preview</h2>
                            <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                                ×
                            </button>
                        </div>
                        <div className="p-4 md:p-6" dangerouslySetInnerHTML={{ __html: generateInvoiceHTML() }} />
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
            <div className="bg-white p-4 md:p-6 shadow-md rounded-md">
                {/* Company Details */}
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium">Order Number</label>
                        <input className="border rounded w-full p-2 mt-1" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                    </div>
                </div>

                {/* Billing & Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Bill To */}
                    <div>
                        <h3 className="font-semibold mb-2">Bill To:</h3>
                        <input
                            className="border rounded w-full p-2 mb-2"
                            value={customerDetails.name}
                            onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                            placeholder="Customer Name"
                        />
                        <input
                            className="border rounded w-full p-2 mb-2"
                            value={customerDetails.email}
                            onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                            placeholder="Email"
                        />
                        <input
                            className="border rounded w-full p-2 mb-2"
                            value={customerDetails.address}
                            onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                            placeholder="Address"
                        />
                        <input
                            className="border rounded w-full p-2 mb-2"
                            value={customerDetails.phone}
                            onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                            placeholder="Phone"
                        />
                        <div className="mt-2">
                            <span className="font-medium">Country: </span>
                            <span>{customerDetails.country}</span>
                        </div>
                        {customerDetails?.coupon_code && (
                            <div className="mt-2">
                                <span className="font-medium">Coupon Code: </span>
                                <span>{customerDetails.coupon_code}</span>
                            </div>
                        )}
                        {/* <div className="mt-1">
                            <span className="font-medium">Payment Status: </span>
                            <span
                                className={`px-2 py-1 rounded text-sm ${
                                    customerDetails.paymentStatus === 'PENDING'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : customerDetails.paymentStatus === 'PAID'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {customerDetails.paymentStatus}
                            </span>
                        </div> */}
                    </div>

                    {/* Payment Details */}
                    <div>
                        {/* <h3 className="font-semibold mb-2">Payment Details:</h3> */}
                        <div className="mb-2">
                            <label className=" font-semibold">Payment Mode:</label>
                            <input
                                className="border rounded w-full p-2"
                                value={customerDetails.payment_mode || 'N/A'}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, payment_mode: e.target.value })}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Payment Status:</label>
                            <input
                                className="border rounded w-full p-2"
                                value={customerDetails.paymentStatus || 'N/A'}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, paymentStatus: e.target.value })}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Order Status:</label>
                            <select
                                value={customerDetails.ORDER_STATUS}
                                onChange={(e) => setCustomerDetails({ ...customerDetails, ORDER_STATUS: e.target.value })}
                                className="border rounded w-full p-2"
                            >
                                <option value="Placed">Placed</option>
                                <option value="Progress">Progress</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancel">Cancel</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Invoice Items */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Item Details</h3>
                    <div className="overflow-x-auto">
                        <div className="min-w-full md:min-w-[600px]">
                            {/* Header Row */}
                            <div className="hidden md:grid grid-cols-12 gap-2 mb-2 text-start font-medium text-sm">
                                <div className="col-span-4 md:col-span-5">Item Name</div>
                                <div className="col-span-3 md:col-span-2">Description</div>
                                <div className="col-span-1">Qty</div>
                                <div className="col-span-1">Price</div>
                                <div className="col-span-1">Total</div>
                                <div className="col-span-1 text-center">Delete</div>
                            </div>

                            {/* Items List */}
                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start mb-3 text-sm border-b pb-2">
                                    {/* Item Name */}
                                    <div className="md:col-span-5">
                                        <label className="md:hidden block text-xs text-start text-gray-500 mb-1">Item Name</label>
                                        {/* <input className="w-full border rounded p-2" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} /> */}
                                        <select
                                            className="w-full border rounded p-2"
                                            value={item.name}
                                            onChange={(e) => handleProductSelect(index, e.target.value)}
                                        >
                                            <option value="">Select a product</option>
                                            {products.map((product) => (
                                                <option key={product.id} value={product.name}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2">
                                        <label className="md:hidden block text-xs  text-start text-gray-500 mb-1">Description</label>
                                        <input className="w-full border rounded p-2" value={item.description || ''} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
                                    </div>

                                    {/* Quantity */}
                                    <div className="md:col-span-1">
                                        <label className="md:hidden block text-xs  text-start text-gray-500 mb-1">Qty</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                        />
                                    </div>

                                    {/* Price */}
                                    <div className="md:col-span-1">
                                        <label className="md:hidden block text-xs  text-start text-gray-500 mb-1">Price</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={item.price}
                                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                        />
                                    </div>

                                    {/* Total (Read-only) */}
                                    <div className="md:col-span-1">
                                        <label className="md:hidden block text-xs  text-start text-gray-500 mb-1">Total</label>
                                        <input className="w-full border rounded p-2 bg-gray-50" type="number" readOnly value={(item.price * item.quantity).toFixed(2)} />
                                    </div>

                                    {/* Delete Button */}
                                    <div className="md:col-span-1 flex justify-center  text-start mt-2 md:mt-0">
                                        <button className="text-red-500 hover:text-red-700" onClick={() => removeItem(index)} title="Delete item">
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md mt-2 transition-colors text-sm md:text-base" onClick={addItem}>
                        Add Item
                    </button>
                </div>

                {/* Pricing Details */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Tax (%)</label>
                        <input className="border rounded w-full p-2 mt-1" type="number" min="0" value={tax} onChange={(e) => setTax(Number(e.target.value))} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Discount (₹)</label>
                        <input className="border rounded w-full p-2 mt-1" type="number" min="0" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Shipping (₹)</label>
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
                        <span className="text-lg md:text-xl font-bold">{grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderEdit;
