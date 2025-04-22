import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface AddCompanyProps {}
interface CompanyData {
  companyName: string;
  buildingNoOfficeNo: string;
  buildingName: string;
  streetNo: string;
  city: string;
  statePinCode: string;
  emailId: string;
  mobileNo: string;
}
const AddContact: React.FC<AddCompanyProps> = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    buildingNoOfficeNo: '',
    buildingName: '',
    streetNo: '',
    city: '',
    statePinCode: '',
    emailId: '',
    mobileNo: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = () => {
    console.log('Saving company data:', companyData);
    // Implement your save logic here (e.g., API call)
  };
  const handleReset = () => {
    setCompanyData({
      companyName: '',
      buildingNoOfficeNo: '',
      buildingName: '',
      streetNo: '',
      city: '',
      statePinCode: '',
      emailId: '',
      mobileNo: '',
    });
  };
  const navigate = useNavigate();
  const handleClick = () => {
    // You can perform other actions here before navigating
    // window.alert('Button clicked!');
    navigate('/Components/customerlist'); // Replace '/CustomerList-page' with the desired route
  };
  return (
    <div className="add-company-page">
      <h1>Add Company</h1>
      <button className="customers-list-button"  onClick={handleClick}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
          <path fillRule="evenodd" d="M3 4a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2H3zm2 2h16a1 1 0 011 1v.586l-3.293 3.293a1 1 0 00-1.414 1.414l-3 3a1 1 0 00-.293.707v3.293a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3.293a1 1 0 00-.293-.707l-3-3a1 1 0 00-1.414-1.414L4 7.586V7a1 1 0 011-1zm10 9a1 1 0 10-2 0v3a1 1 0 102 0v-3z" clipRule="evenodd" />
        </svg>
        Customers List
      </button>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyData.companyName}
            onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="buildingNoOfficeNo">Building No/Office No</label>
          <input
            type="text"
            id="buildingNoOfficeNo"
            name="buildingNoOfficeNo"
            value={companyData.buildingNoOfficeNo}
            onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="buildingName">Building Name</label>
          <input
            type="text"
            id="buildingName"
            name="buildingName"
            value={companyData.buildingName}
            onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="streetNo">Street No</label>
          <input
            type="text"
            id="streetNo"
            name="streetNo"
            value={companyData.streetNo}
            onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={companyData.city}
            onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="statePinCode">State/Pincode</label>
          <input
            type="text"
            id="statePinCode"
            name="statePinCode"
            value={companyData.statePinCode}
            onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailId">Email Id *</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={companyData.emailId}
            onChange={handleChange} required
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No *</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={companyData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default AddContact;