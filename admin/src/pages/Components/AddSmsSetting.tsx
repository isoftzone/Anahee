import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSmsSettings = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic here
  };

  const handleReset = () => {
    setStatus(false);
    // reset other form values here
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">SMS SETTINGS</h2>
        </div>

        <button
          onClick={() => navigate("/sms-settings-list")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
        >
          📝 SMS SETTINGS LIST
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-32 font-medium">SMS TYPE *</label>
            <select className="flex-1 border border-gray-300 rounded px-3 py-2">
              <option value="ORDER">ORDER</option>
              {/* Add more types if needed */}
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-32 font-medium">Status *</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={status}
                onChange={() => setStatus(!status)}
                className="sr-only"
                id="status-toggle"
              />
              <label
                htmlFor="status-toggle"
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  status ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    status ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-32 font-medium">Sender Id *</label>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-32 font-medium">Auth Key *</label>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-32 font-medium">URL</label>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <label className="w-32 font-medium">Message*</label>
            <textarea
              className="flex-1 border border-gray-300 rounded px-3 py-2 min-h-[100px]"
              required
            ></textarea>
          </div>

          <div className="flex gap-3 justify-end">
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

export default AddSmsSettings;
