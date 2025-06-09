import React from "react";

const StoreMaster: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Add Store Master</h2>
      <form className="bg-white p-6 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Store Name</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Store Name" />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Address" />
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <select className="w-full border px-3 py-2 rounded">
            <option>Select Country</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <select className="w-full border px-3 py-2 rounded">
            <option>Select Country</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <select className="w-full border px-3 py-2 rounded">
            <option>Select City</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Pincode</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Pincode" />
        </div>

        <div>
          <label className="block text-sm font-medium">Latitude</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Latitude" />
        </div>

        <div>
          <label className="block text-sm font-medium">Longitude</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Longitude" />
        </div>

        <div>
          <label className="block text-sm font-medium">Time</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Ex-10 To 07" />
        </div>

        <div>
          <label className="block text-sm font-medium">Days</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Ex-Mon To Sun" />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Status</span>
          <label className="flex items-center gap-1">
            <input type="radio" name="status" /> Active
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="status" /> Inactive
          </label>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Store</span>
          <label className="flex items-center gap-1">
            <input type="radio" name="store" /> On
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="store" /> Off
          </label>
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Delivery Range</span>
            <label className="flex items-center gap-1">
              <input type="radio" name="range" /> Unlimited
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="range" /> In Kilometer
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" /> By Pincode
            </label>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save
          </button>
          <button
            type="reset"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreMaster;
