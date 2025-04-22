import React from "react";
import { useNavigate } from "react-router-dom";
const SmsSetting = () => {
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate("/Components/addsmssettings"); // Update this path as per your routing
      };
    

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Sms Settings List</h2>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            + Add SMS SETTINGS
          </button> */}

          <button
            onClick={handleAddClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add SMS SETTINGS
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="entries" className="text-sm whitespace-nowrap">
              Show
            </label>
            <select
              id="entries"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm">entries</span>
          </div>

          <div className="ml-auto">
            <input
              type="text"
              placeholder="Search:"
              className="border border-gray-300 rounded px-3 py-1 text-sm w-full max-w-xs"
            />
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-2 border">Sr. no</th>
                <th className="p-2 border">TYPE</th>
                <th className="p-2 border">SENDER ID</th>
                <th className="p-2 border">AUTH KEY</th>
                <th className="p-2 border">STATUS</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="p-2 border">1</td>
                <td className="p-2 border">ORDER</td>
                <td className="p-2 border">YOAPPS</td>
                <td className="p-2 border truncate max-w-[300px]">
                  d55cf7975e584398cf6283ad562be
                </td>
                <td className="p-2 border text-green-600">Active</td>
                <td className="p-2 border">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm font-bold">
                    ✎
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center text-sm mt-2">
          <p>Showing 1 to 1 of 1 entries</p>
          <div className="flex items-center gap-2">
            <button className="border px-2 py-1 bg-gray-300 rounded">Previous</button>
            <span className="px-2 py-1 border rounded bg-white">1</span>
            <button className="border px-2 py-1 bg-gray-300 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsSetting;
