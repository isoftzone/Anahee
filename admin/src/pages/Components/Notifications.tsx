import React from "react";

const Notifications = () => {
  return (
    <div className="p-4 md:p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Notifications</h2>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notification Type Dropdown */}
          <div className="md:col-span-2">
            <select className="w-full border border-gray-300 p-2 rounded">
              <option>OFFERS</option>
              <option>ANNOUNCEMENT</option>
            </select>
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="notification title"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="notification message"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <input type="file" className="w-full border border-gray-300 p-2 rounded" />
          </div>

          {/* Save Button */}
          <div className="md:col-span-2">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg p-4 overflow-auto">
        {/* Action buttons (DataTable-style mockup) */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="border px-3 py-1 rounded">Show 10 rows</button>
          <button className="border px-3 py-1 rounded">Csv</button>
          <button className="border px-3 py-1 rounded">Copy</button>
          <button className="border px-3 py-1 rounded">Excel</button>
          <button className="border px-3 py-1 rounded">PDF</button>
          <button className="border px-3 py-1 rounded">Column visibility</button>

          <div className="ml-auto">
            <label className="mr-2">Search:</label>
            <input
              type="text"
              className="border border-gray-300 p-1 rounded"
              placeholder=""
            />
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 border">Sr.no</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Message</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "announcement", "New Category Added", "Crockery"],
              ["2", "offers", "Mega Offer", "Buy 1 Get 1 Free"],
              ["3", "announcement", "Todays Mega Offer", "You can win up to 100 rs cashback"],
              ["4", "offers", "Todays Mega Offer", "You can win up to 100 rs cashback"],
              ["5", "offers", "Todays Mega Offer", "You can win up to 100 rs cashback"],
            ].map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {row.map((cell, i) => (
                  <td key={i} className="px-4 py-2 border">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
