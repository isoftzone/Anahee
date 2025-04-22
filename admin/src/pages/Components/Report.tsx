import React from "react";

const Report = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Reports</h2>

        <div className="overflow-x-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">All Reports</button>
            <button className="border border-gray-300 px-3 py-1 rounded text-sm">Copy</button>
            <button className="border border-gray-300 px-3 py-1 rounded text-sm">Excel</button>
            <button className="border border-gray-300 px-3 py-1 rounded text-sm">PDF</button>
            <button className="border border-gray-300 px-3 py-1 rounded text-sm">Column visibility</button>
            <input
              type="text"
              placeholder="Search"
              className="ml-auto border border-gray-300 rounded px-3 py-1 text-sm"
            />
          </div>

          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-200 px-2 py-1">S no</th>
                <th className="border border-gray-200 px-2 py-1">Order No</th>
                <th className="border border-gray-200 px-2 py-1">Status</th>
                <th className="border border-gray-200 px-2 py-1">User Name</th>
                <th className="border border-gray-200 px-2 py-1">Mobile No</th>
                <th className="border border-gray-200 px-2 py-1">Total Amount</th>
                <th className="border border-gray-200 px-2 py-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(50)].map((_, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-200 px-2 py-1 text-center">{index + 1}</td>
                  <td className="border border-gray-200 px-2 py-1">Order No - {index + 1}</td>
                  <td className="border border-gray-200 px-2 py-1">placed</td>
                  <td className="border border-gray-200 px-2 py-1">Priyans Gupta</td>
                  <td className="border border-gray-200 px-2 py-1">7986521456</td>
                  <td className="border border-gray-200 px-2 py-1 text-right">₹{(Math.random() * 1000).toFixed(2)}</td>
                  <td className="border border-gray-200 px-2 py-1">08/04/2025</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center text-sm mt-4">
            <span>Showing 1 to 50 of 50 entries</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border rounded">Previous</button>
              <button className="px-2 py-1 border rounded bg-blue-600 text-white">1</button>
              <button className="px-2 py-1 border rounded">2</button>
              <button className="px-2 py-1 border rounded">3</button>
              <button className="px-2 py-1 border rounded">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
