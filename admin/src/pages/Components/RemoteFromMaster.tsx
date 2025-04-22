import React, { useEffect, useState } from "react";
import axios from "axios";

interface Report {
  FormName: string;
  Control: string;
  NAME: string;
  Type: string;
  Value: string;
  SEQUENCE: string;
}

const RemoteFromMaster: React.FC = () => {
  const [salesDetails, setSalesDetails] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSalesDetail();
  }, []);

  const fetchSalesDetail = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getrfmaster");
      console.log("API Response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setSalesDetails(response.data.data);
      } else {
        setSalesDetails([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sales details:", error);
      setError("Failed to fetch sales details. Please try again later.");
      setSalesDetails([]);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Table Container */}
      <div className="bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Remote From Master</h2>

        {/* Display Error Message */}
        {error && (
          <div className="text-red-500 text-center p-3">{error}</div>
        )}

        {/* Table */}
        <div className="mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Form Name</th>
                <th className="p-3 border">Control</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Value</th>
                <th className="p-3 border">Sequence</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-3">Loading...</td>
                </tr>
              ) : salesDetails.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-3">No Data Found</td>
                </tr>
              ) : (
                salesDetails.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 border">{item.FormName}</td>
                    <td className="p-3 border">{item.Control}</td>
                    <td className="p-3 border">{item.NAME}</td>
                    <td className="p-3 border">{item.Type}</td>
                    <td className="p-3 border">{item.Value}</td>
                    <td className="p-3 border">{item.SEQUENCE}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5 mt-4">
          <button type="button" className="btn btn-primary btn-sm">Save</button>
          <button type="button" className="btn btn-primary btn-sm">Insert</button>
          <button type="button" className="btn btn-primary btn-sm">Update</button>
          <button type="button" className="btn btn-primary btn-sm">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default RemoteFromMaster;