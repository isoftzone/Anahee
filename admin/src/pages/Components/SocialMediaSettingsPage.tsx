import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
interface SocialMediaLinks {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
}
interface SocialMediaSettings {
    facebookEnabled: boolean;
    instagramEnabled: boolean;
    youtubeEnabled: boolean;
    linkedinEnabled: boolean;
    links: SocialMediaLinks;
}
const initialSettings: SocialMediaSettings = {
    facebookEnabled: true,
    instagramEnabled: true,
    youtubeEnabled: true,
    linkedinEnabled: true,
    links: {
        facebook: '',
        instagram: '',
        youtube: '',
        linkedin: '',
    },
};
const SocialMediaSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState(initialSettings);
    useEffect(() => {
        axios
            .get(`${BASE_URL}/get-social-links`)
            .then((res) => {
                const data = res.data;
                console.log(data,data.facebook)
                setSettings({
                    facebookEnabled: data?.facebook?.status === 1,
                    instagramEnabled: data?.instagram?.status === 1,
                    youtubeEnabled: data?.youtube?.status === 1,
                    linkedinEnabled: data?.linkedin?.status === 1,
                    links: {
                        facebook: data?.facebook?.url || '',
                        instagram: data?.instagram?.url || '',
                        youtube: data?.youtube?.url || '',
                        linkedin: data?.linkedin?.url || '',
                    },
                });
            })
            .catch((err) => console.error('Error fetching links', err));
    }, []);
    const handleSave = () => {
        axios
            .post(`${BASE_URL}/save-social-links`, settings)
            .then(() => {
                alert('Social Media Settings saved!');
            })
            .catch((err) => {
                console.error('Error saving links:', err);
                alert('Failed to save settings.');
            });
    };
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
    return (
        <div className="social-media-settings-container">
            <h2 className="settings-title">Social Media Settings</h2>
            <div className="settings-form">
                <div className="setting-item">
                    <label className="checkbox-label">
                        <input type="checkbox" name="facebookEnabled" checked={settings.facebookEnabled} onChange={handleChangeCheckbox} />
                        Facebook
                    </label>
                    {settings.facebookEnabled && <input type="text" name="facebook" placeholder="facebook link" value={settings.links.facebook} onChange={handleChangeLink} className="link-input" />}
                </div>
                <div className="setting-item">
                    <label className="checkbox-label">
                        <input type="checkbox" name="instagramEnabled" checked={settings.instagramEnabled} onChange={handleChangeCheckbox} />
                        Instagram
                    </label>
                    {settings.instagramEnabled && (
                        <input type="text" name="instagram" placeholder="instagram link" value={settings.links.instagram} onChange={handleChangeLink} className="link-input" />
                    )}
                </div>
                <div className="setting-item">
                    <label className="checkbox-label">
                        <input type="checkbox" name="youtubeEnabled" checked={settings.youtubeEnabled} onChange={handleChangeCheckbox} />
                        Youtube
                    </label>
                    {settings.youtubeEnabled && <input type="text" name="youtube" placeholder="youtube link" value={settings.links.youtube} onChange={handleChangeLink} className="link-input" />}
                </div>
                {/* <div className="setting-item">
                    <label className="checkbox-label">
                        <input type="checkbox" name="linkedinEnabled" checked={settings.linkedinEnabled} onChange={handleChangeCheckbox} />
                        LinkedIn
                    </label>
                    {settings.linkedinEnabled && <input type="text" name="linkedin" placeholder="linkedin link" value={settings.links.linkedin} onChange={handleChangeLink} className="link-input" />}
                </div> */}
                <button onClick={handleSave} className="save-button">
                    Save
                </button>
            </div>
        </div>
    );
};
export default SocialMediaSettingsPage;