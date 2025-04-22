import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config"; // Adjust the path as needed



interface DropdownOptions {
  [key: string]: string[];
}

const FormMaster: React.FC = () => {
  const [dropdownData, setDropdownData] = useState<DropdownOptions>({});
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedControl, setSelectedControl] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const dropdownFields = ["formName", "Control", "C_Name"];

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/postcmbAW`, {
          TblName: "MASTER",
          FldName: "PRIMENAME",
          FldCode: "PRIMEKEYID",
          OrdBy: "SEQUENCE",
          WhFldName: dropdownFields,
        });

        const rawData = response.data;

        const parsed: DropdownOptions = {};
        dropdownFields.forEach((key) => {
          parsed[key] = rawData[key]?.map((item: any) => item.PRIMENAME) || [];
        });

        setDropdownData(parsed);
      } catch (error) {
        console.error("Error fetching dropdowns:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      formName: selectedForm,
      control: selectedControl,
      name: selectedName,
    };
    console.log("Form Submitted:", formData);
    // Send formData to backend
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Form Master</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Form Name</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            required
          >
            <option value="">Select Form</option>
            {dropdownData["formName"]?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Control */}
        <div>
          <label className="block text-sm font-medium mb-1">Control</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedControl}
            onChange={(e) => setSelectedControl(e.target.value)}
            required
          >
            <option value="">Select Control</option>
            {dropdownData["Control"]?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            required
          >
            <option value="">Select Name</option>
            {dropdownData["C_Name"]?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button> */}
      </form>
    </div>
  );
};

export default FormMaster;
