import React, { useState } from 'react';
// import '../tailwind.css'; // Optional: For more specific styling
interface LabelSettingsProps {}
interface LabelState {
  SP1: string;
  SP2: string;
  SP3: string;
  SP4: string;
  SP5: string;
}
const initialLabels: LabelState = {
  SP1: 'Online Retail',
  SP2: 'Online Wholesale',
  SP3: 'Online Wholesale Prepaid',
  SP4: 'Offline Retail',
  SP5: 'Offline Wholesale',
};
const CaptionMaster: React.FC<LabelSettingsProps> = () => {
  const [labels, setLabels] = useState<LabelState>(initialLabels);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLabels((prevLabels) => ({
      ...prevLabels,
      [name]: value,
    }));
  };
  const handleUpdate = () => {
    console.log('Updating labels:', labels);
    // In a real application, you would send this data to your backend API.
    alert('Labels updated successfully!');
  };
  return (
    <div className="label-settings-page">
      <h1>Label Settings</h1>
      <div className="settings-container">
        <div className="label-input-group">
          <label htmlFor="SP1">SP1:</label>
          <input
            type="text"
            id="SP1"
            name="SP1"
            value={labels.SP1}
            onChange={handleInputChange}
          />
        </div>
        <div className="label-input-group">
          <label htmlFor="SP2">SP2:</label>
          <input
            type="text"
            id="SP2"
            name="SP2"
            value={labels.SP2}
            onChange={handleInputChange}
          />
        </div>
        <div className="label-input-group">
          <label htmlFor="SP3">SP3:</label>
          <input
            type="text"
            id="SP3"
            name="SP3"
            value={labels.SP3}
            onChange={handleInputChange}
          />
        </div>
        <div className="label-input-group">
          <label htmlFor="SP4">SP4:</label>
          <input
            type="text"
            id="SP4"
            name="SP4"
            value={labels.SP4}
            onChange={handleInputChange}
          />
        </div>
        <div className="label-input-group">
          <label htmlFor="SP5">SP5:</label>
          <input
            type="text"
            id="SP5"
            name="SP5"
            value={labels.SP5}
            onChange={handleInputChange}
          />
        </div>
        <button className="update-button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};
export default CaptionMaster;