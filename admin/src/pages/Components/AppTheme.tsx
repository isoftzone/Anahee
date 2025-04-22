import React, { useState } from 'react';
// import '../tailwind.css'; // Optional: For more specific styling
interface AppThemeProps {}
const AppTheme: React.FC<AppThemeProps> = () => {
  const [themeColor, setThemeColor] = useState('#100571'); // Initialize with the displayed color
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeColor(event.target.value);
  };
  const handleSave = () => {
    console.log('Saving theme color:', themeColor);
    // Implement your save logic here (e.g., API call, local storage)
  };
  const handleReset = () => {
    setThemeColor('#100571'); // Reset to the initial/default color
  };
  return (
    <div className="app-theme-page">
      <h1>App Theme</h1>
      <div className="theme-selector">
        <label htmlFor="themeColor">App Theme</label>
        <div className="color-input-container">
          <input
            type="color"
            id="themeColor"
            value={themeColor}
            onChange={handleColorChange}
          />
          <input
            type="text"
            value={themeColor}
            onChange={handleColorChange}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="btn btn-primary">Save</button>
        <button className="btn btn-danger">Reset</button>
      </div>
    </div>
  );
};
export default AppTheme;