import React, { useState } from 'react';
// import '../tailwind.css'; // Optional: For more specific styling
interface LoginSettingsProps {}
const LoginSettings: React.FC<LoginSettingsProps> = () => {
  const [selectedLoginType, setSelectedLoginType] = useState<string | null>(null);
  const handleLoginTypeChange = (type: string) => {
    setSelectedLoginType(type);
  };
  const handleSave = () => {
    if (selectedLoginType) {
      console.log('Saving login type:', selectedLoginType);
      // Implement your save logic here (e.g., API call)
      alert(`Login type "${selectedLoginType}" saved!`);
    } else {
      alert('Please select a login type.');
    }
  };
  return (
    <div className="login-settings-page">
      <h1>Login Settings</h1>
      <button className="promo-banners-button">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
            {/* Example icon for banners (you might need a specific one) */}
            <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 6h5v4H4V6zm6 0h5v4h-5V6zm6 0h5v4h-5V6zm-12 6h5v4H4v-4zm6 0h5v4h-5v-4zm6 0h5v4h-5v-4z" />
          </svg>
          Login Setting
        </button>
      <div className="settings-container">
        <h2>Select Login Type</h2>
        <div className="login-options-card">
          <label className={`login-option ${selectedLoginType === 'homePage' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="loginType"
              value="homePage"
              checked={selectedLoginType === 'homePage'}
              onChange={() => handleLoginTypeChange('homePage')}
            />
            Home Page
          </label>
          <label className={`login-option ${selectedLoginType === 'loginWithSkip' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="loginType"
              value="loginWithSkip"
              checked={selectedLoginType === 'loginWithSkip'}
              onChange={() => handleLoginTypeChange('loginWithSkip')}
            />
            Login With Skip
          </label>
          <label className={`login-option ${selectedLoginType === 'login' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="loginType"
              value="login"
              checked={selectedLoginType === 'login'}
              onChange={() => handleLoginTypeChange('login')}
            />
            Login
          </label>
          <label className={`login-option ${selectedLoginType === 'loginVerifyUserOnly' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="loginType"
              value="loginVerifyUserOnly"
              checked={selectedLoginType === 'loginVerifyUserOnly'}
              onChange={() => handleLoginTypeChange('loginVerifyUserOnly')}
            />
            Login With Verify User Only
          </label>
          <button className="save-button" onClick={handleSave} >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginSettings;