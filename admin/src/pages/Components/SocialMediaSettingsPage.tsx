import React, { useState } from 'react';
interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}
interface SocialMediaSettings {
  facebookEnabled: boolean;
  instagramEnabled: boolean;
  twitterEnabled: boolean;
  linkedinEnabled: boolean;
  links: SocialMediaLinks;
}
const initialSettings: SocialMediaSettings = {
  facebookEnabled: true,
  instagramEnabled: true,
  twitterEnabled: true,
  linkedinEnabled: true,
  links: {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  },
};
const SocialMediaSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };
  const handleChangeLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      links: {
        ...prevSettings.links,
        [name]: value,
      },
    }));
  };
  const handleSave = () => {
    // In a real application, you would send this 'settings' data to your backend API
    console.log('Social Media Settings:', settings);
    alert('Social Media Settings saved!');
  };
  return (
    <div className="social-media-settings-container">
      <h2 className="settings-title">Social Media Settings</h2>
      <div className="settings-form">
        <div className="setting-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="facebookEnabled"
              checked={settings.facebookEnabled}
              onChange={handleChangeCheckbox}
            />
            Facebook
          </label>
          {settings.facebookEnabled && (
            <input
              type="text"
              name="facebook"
              placeholder="facebook link"
              value={settings.links.facebook}
              onChange={handleChangeLink}
              className="link-input"
            />
          )}
        </div>
        <div className="setting-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="instagramEnabled"
              checked={settings.instagramEnabled}
              onChange={handleChangeCheckbox}
            />
            Instagram
          </label>
          {settings.instagramEnabled && (
            <input
              type="text"
              name="instagram"
              placeholder="instagram link"
              value={settings.links.instagram}
              onChange={handleChangeLink}
              className="link-input"
            />
          )}
        </div>
        <div className="setting-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="twitterEnabled"
              checked={settings.twitterEnabled}
              onChange={handleChangeCheckbox}
            />
            Twitter
          </label>
          {settings.twitterEnabled && (
            <input
              type="text"
              name="twitter"
              placeholder="twitter link"
              value={settings.links.twitter}
              onChange={handleChangeLink}
              className="link-input"
            />
          )}
        </div>
        <div className="setting-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="linkedinEnabled"
              checked={settings.linkedinEnabled}
              onChange={handleChangeCheckbox}
            />
            LinkedIn
          </label>
          {settings.linkedinEnabled && (
            <input
              type="text"
              name="linkedin"
              placeholder="linkedin link"
              value={settings.links.linkedin}
              onChange={handleChangeLink}
              className="link-input"
            />
          )}
        </div>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
};
export default SocialMediaSettingsPage;