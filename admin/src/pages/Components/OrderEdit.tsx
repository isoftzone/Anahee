import React, { useState } from "react";

const OrderEdit: React.FC = () => {
  const [items, setItems] = useState([
    { name: "Calendar App Customization", description: "Make Calendar App Dynamic", quantity: 2, price: 120 },
    { name: "Chat App Customization", description: "Customized Chat Application to resolve some Bug Fixes", quantity: 1, price: 25 },
  ]);
  const [subtotal, setSubtotal] = useState(265);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Bank Account");

  const addItem = () => {
    setItems([...items, { name: "", description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleChange = (index: number, key: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [key]: value };
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (updatedItems: any[]) => {
    const total = updatedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setSubtotal(total);
  };

  const grandTotal = subtotal + (subtotal * tax) / 100 - (subtotal * discount) / 100 + shipping;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-semibold">VRISTO</h1> */}
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Send Invoice</button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Preview</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md">Download</button>
        </div>
      </div>

      {/* Invoice Form */}
      <div className="bg-white p-6 shadow-md rounded-md">
        {/* Company Details */}
        <div className="flex justify-between mb-6">
          <div>
            <p className="font-bold">13 Tetrick Road, Cypress Gardens, Florida, 33884, US</p>
            <p>vristo@gmail.com</p>
            <p>+1 (070) 123-4567</p>
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium">Invoice Number</label>
            <input className="border rounded w-full p-2 mt-1" type="text" defaultValue="#0001" />
          </div>
        </div>

        {/* Billing & Payment Details */}
        <div className="grid grid-cols-2 gap-6">
          {/* Bill To */}
          <div>
            <h3 className="font-semibold mb-2">Bill To:</h3>
            <input className="border rounded w-full p-2 mb-2" defaultValue="Jesse Cary" />
            <input className="border rounded w-full p-2 mb-2" defaultValue="rock@company.com" />
            <input className="border rounded w-full p-2 mb-2" defaultValue="405 Mulbarry Rd, NC, 28643" />
            <input className="border rounded w-full p-2 mb-2" defaultValue="(218) 666 070" />
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="font-semibold mb-2">Payment Details:</h3>
            <input className="border rounded w-full p-2 mb-2" defaultValue="1234567890" />
            <input className="border rounded w-full p-2 mb-2" defaultValue="Bank of America" />
            <input className="border rounded w-full p-2 mb-2" defaultValue="V351314" />
            <input className="border rounded w-full p-2 mb-2" defaultValue="K456G" />
          </div>
        </div>

        {/* Invoice Items */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Item Details</h3>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 items-center mb-2">
              <input className="border rounded p-2" value={item.name} readOnly />
              <input className="border rounded p-2" value={item.description} readOnly />
              <input className="border rounded p-2" type="number" value={item.quantity} readOnly />
              <input className="border rounded p-2" type="number" value={item.price} readOnly />
              <button className="text-red-500" onClick={() => removeItem(index)}>❌</button>
            </div>
          ))}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={addItem}>Add Item</button>
        </div>

        {/* Pricing Details */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Tax (%)</label>
            <input className="border rounded w-full p-2 mt-1" type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium">Discount (%)</label>
            <input className="border rounded w-full p-2 mt-1" type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium">Shipping Charge ($)</label>
            <input className="border rounded w-full p-2 mt-1" type="number" value={shipping} onChange={(e) => setShipping(Number(e.target.value))} />
          </div>
        </div>

        {/* Total Section */}
        <div className="text-right mt-6">
          <p>Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span></p>
          <p>Grand Total: <span className="text-xl font-bold">${grandTotal.toFixed(2)}</span></p>
        </div>
      </div>
    </div>
  );
};

export default OrderEdit;
