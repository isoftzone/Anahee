import React, { useState } from "react";

const RefferalCoupan: React.FC = () => {
  const [status, setStatus] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Refferal Coupon</h2>

        <div className="grid grid-cols-2 gap-4">

          {/* <div className="flex flex-col">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={status}
                onChange={() => setStatus(!status)}
              />
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
                  status ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform ${
                    status ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </label>
          </div> */}

          <div className="flex flex-col">
            <label className="font-semibold">Date From *</label>
            <input type="date" className="border p-2 rounded" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold"> To *</label>
            <input type="date" className="border p-2 rounded" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">R. Amount</label>
            <input type="number" placeholder="Enter Minimum Bill Amount" className="border p-2 rounded" />
          </div>

          {/* <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPercentage}
              onChange={() => setIsPercentage(!isPercentage)}
              className="w-4 h-4"
            />
            <label className="font-semibold">Percentage</label>
          </div> */}

          {/* <div className="flex flex-col">
            <label className="font-semibold">Discount PER %</label>
            <input type="number" placeholder="Enter Percent" className="border p-2 rounded" />
          </div> */}

          {/* <div className="flex flex-col">
            <label className="font-semibold">Max Amount To Redeem%</label>
            <input type="number" placeholder="Enter Max Amount To Redeem" className="border p-2 rounded" />
          </div> */}

          <div className="flex flex-col">
            {/* <label className="font-semibold">No Coupon Redeemed</label> */}
            {/* <input type="number" placeholder="No of times coupon redeemed" className="border p-2 rounded" /> */}
          </div>
        </div>

        <div className="mt-4 flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          <button className="bg-gray-300 px-4 py-2 rounded">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default RefferalCoupan;
