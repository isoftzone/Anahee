import React from "react";

const MasterSetting = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Setting Masters</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Code Type</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Color</option>
              <option>Size</option>
              <option>Type</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" placeholder="Name" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sequence</label>
            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Select Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Remarks</label>
          <textarea className="w-full border border-gray-300 rounded px-3 py-2" rows={3} placeholder="Remarks" />
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded mb-6">Save</button>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-200 px-2 py-1">Sr. no</th>
                <th className="border border-gray-200 px-2 py-1">Code</th>
                <th className="border border-gray-200 px-2 py-1">Name</th>
                <th className="border border-gray-200 px-2 py-1">Sequence</th>
                <th className="border border-gray-200 px-2 py-1">Remark</th>
                <th className="border border-gray-200 px-2 py-1">Status</th>
                <th className="border border-gray-200 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-200 px-2 py-1 text-center">{index + 1}</td>
                  <td className="border border-gray-200 px-2 py-1">Code-{index + 1}</td>
                  <td className="border border-gray-200 px-2 py-1">Name {index + 1}</td>
                  <td className="border border-gray-200 px-2 py-1 text-center">{index + 1}</td>
                  <td className="border border-gray-200 px-2 py-1">Sample Remark</td>
                  <td className="border border-gray-200 px-2 py-1">Active</td>
                  <td className="border border-gray-200 px-2 py-1 text-center">
                    <button className="text-blue-600 hover:underline text-xs">Edit</button>
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

export default MasterSetting;
