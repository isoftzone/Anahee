import React from "react";

const AppVersion: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">App Version</h2>

      <form className="bg-white p-4 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Version Code</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Enter Version Code" />
        </div>
        <div>
          <label className="block text-sm font-medium">Version Name</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Enter Version Name" />
        </div>
        <div className="md:col-span-2 flex gap-4 justify-center md:justify-start">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save</button>
          <button className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">Reset</button>
        </div>
      </form>

      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="space-x-2">
            <button className="border px-3 py-1 rounded">Show 10 rows</button>
            <button className="border px-3 py-1 rounded">Csv</button>
            <button className="border px-3 py-1 rounded">Copy</button>
            <button className="border px-3 py-1 rounded">Excel</button>
            <button className="border px-3 py-1 rounded">PDF</button>
            <button className="border px-3 py-1 rounded">Column visibility</button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded"
            />
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-left border border-gray-300">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-2 border">Sr.no</th>
                <th className="px-4 py-2 border">Version Code</th>
                <th className="px-4 py-2 border">Version Name</th>
                <th className="px-4 py-2 border">Created_At</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(15)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{index + 2}</td>
                  <td className="border px-4 py-2">2.{index + 2}</td>
                  <td className="border px-4 py-2">2020-04-{10 + index} 00:00:00</td>
                  <td className="border px-4 py-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppVersion;
