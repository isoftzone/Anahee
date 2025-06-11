import React from "react";

const NotificationKey = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">FireBase Key</h2>

        <form className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start">
            <label className="w-full md:w-1/6 font-medium text-sm mb-2 md:mb-0">
              Key *
            </label>
            <textarea
              rows={4}
              className="w-full md:w-5/6 border border-gray-300 rounded px-3 py-2 text-sm resize-none"
              placeholder="Enter Firebase Key"
            ></textarea>
          </div>

          <div className="flex justify-center md:justify-start gap-2 mt-4">
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
    </div>
  );
};

export default NotificationKey;
