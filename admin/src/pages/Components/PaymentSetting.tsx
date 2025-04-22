import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSetting = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientId: "",
    clientSecret: "",
    status: false,
    userDefinedName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your save logic here
  };

  const handleReset = () => {
    setFormData({
      clientId: "",
      clientSecret: "",
      status: false,
      userDefinedName: "",
    });
  };

  const handleBackClick = () => {
    navigate("/Components/paymentsetting");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Options</h2>

        <button
          onClick={handleBackClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
        >
          ⬅ Payment Settings
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Client Id *</label>
            <input
              type="text"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Client Secret *</label>
            <input
              type="text"
              name="clientSecret"
              value={formData.clientSecret}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Status *</label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                  formData.status ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    formData.status ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </label>
          </div>

          <div>
            <label className="block font-semibold mb-1">User Defined Name</label>
            <input
              type="text"
              name="userDefinedName"
              value={formData.userDefinedName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentSetting;
