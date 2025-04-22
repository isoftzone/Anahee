import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../config";

// Define the type for form data
interface FormData {
  USERNAME: string;
  EMAIL: string;
  FNAME: string;
  LNAME: string;
  PASSWORD: string;
  dob: string;
  MOBILE: string;
  PROFILEIMAGE: File | null;
  PROFESSION: string;
  STATUS: string;
  gender: string;
  LOCATION: string;
}

const Register = () => {
  // State to manage form data with the FormData type
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    USERNAME: "",
    EMAIL: "",
    FNAME: "",
    LNAME: "",
    PASSWORD: "",
    dob: "",
    MOBILE: "",
    PROFILEIMAGE: null,
    PROFESSION: "customer",
    STATUS: "not-verified",
    gender: "male",
    LOCATION: "",
  });
  const handleClick = () => {
    navigate('/components/Users');
};

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
  
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        PROFILEIMAGE: file, // Now setting the file instead of 'null'
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        PROFILEIMAGE: null, // If no file is selected, set it to null
      }));
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Create FormData to send file and other form data
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key === "PROFILEIMAGE" && formData[key as keyof FormData]) {
        formDataToSend.append(key, formData[key as keyof FormData] as Blob); // Append the file as Blob
      } else if (key !== "PROFILEIMAGE") {
        formDataToSend.append(key, formData[key as keyof FormData] as string);
      }
    }
  
    try {
      // Send data to the backend via POST request
      const response = await axios.post(`${BASE_URL}/upload_userMaster`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(response);
  
      // Handle successful response
      if (response.status === 200) {
        alert("User data saved successfully");
      }
    } catch (error) {
      // Handle error
      console.error("Error saving user data:", error);
      alert("Failed to save user data");
    }
  };
  

  return (
    <div className="p-4 md:p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Add User</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded mb-6 flex items-center gap-2">
          <i className="fas fa-list-ul"></i> User List
        </button>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* User Name */}
          <div>
            <label className="block font-semibold mb-1">User Name *</label>
            <input
              type="text"
              placeholder="User Name"
              name="USERNAME"
              value={formData.USERNAME}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-semibold mb-1">EMAIL Address *</label>
            <input
              type="EMAIL"
              placeholder="EMAIL LOCATION"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block font-semibold mb-1">First Name *</label>
            <input
              type="text"
              placeholder="First Name"
              name="FNAME"
              value={formData.FNAME}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-semibold mb-1">Last Name *</label>
            <input
              type="text"
              placeholder="Last Name"
              name="LNAME"
              value={formData.LNAME}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block font-semibold mb-1">PASSWORD *</label>
            <input
              type="PASSWORD"
              placeholder="PASSWORD"
              name="PASSWORD"
              value={formData.PASSWORD}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-semibold mb-1">Date of Birth*</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Phone No */}
          <div>
            <label className="block font-semibold mb-1">Phone No</label>
            <input
              type="tel"
              placeholder="Phone Number"
              name="MOBILE"
              value={formData.MOBILE}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* PROFILEIMAGE Upload */}
          <div>
            <label className="block font-semibold mb-1">PROFILEIMAGE</label>
            <input
              type="file"
              name="PROFILEIMAGE"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* User Role */}
          <div>
            <label className="block font-semibold mb-1">User Role</label>
            <select
              name="PROFESSION"
              value={formData.PROFESSION}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="block font-semibold mb-1">STATUS</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="STATUS"
                  value="verified"
                  onChange={handleInputChange}
                  checked={formData.STATUS === "verified"}
                />
                Verified
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="STATUS"
                  value="not-verified"
                  onChange={handleInputChange}
                  checked={formData.STATUS === "not-verified"}
                />
                Not Verified
              </label>
            </div>
          </div>

          {/* Gender */}
          {/* <div>
            <label className="block font-semibold mb-1">Gender *</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInputChange}
                  checked={formData.gender === "male"}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInputChange}
                  checked={formData.gender === "female"}
                />
                Female
              </label>
            </div>
          </div> */}

          {/* LOCATION */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">LOCATION</label>
            <textarea
              placeholder="LOCATION"
              rows={3}
              name="LOCATION"
              value={formData.LOCATION}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="reset" className="bg-gray-300 px-4 py-2 rounded">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
