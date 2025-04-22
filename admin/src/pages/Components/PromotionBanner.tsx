import React, { useState } from 'react';
// import "../../tailwind.css"

interface PromotionBanner {
  srNo: number;
  image: string; // Path or URL to the image
  action: React.ReactNode; // Could be buttons or other interactive elements
}

interface PromotionBannersProps {}

const PromotionBanners: React.FC<PromotionBannersProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [banners, setBanners] = useState<PromotionBanner[]>([]); // Example state for banners

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      console.log('Saving file:', selectedFile);
      // In a real application, you would upload this file to a server
      // and then update the 'banners' state with the new banner information.

      // For this example, let's simulate adding a new banner to the state:
      const newBanner: PromotionBanner = {
        srNo: banners.length + 1,
        image: URL.createObjectURL(selectedFile), // Temporary object URL for preview
        action: (
          <div>
            {/* Add your action buttons/links here */}
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ),
      };
      setBanners([...banners, newBanner]);
      setSelectedFile(null); // Clear the selected file after "saving"
    } else {
      alert('Please choose a file to save.');
    }
  };

  return (
    <div className="promotion-banners-page">
      <h1>Promotion Banners</h1>

      <div className="upload-section">
        <button className="promo-banners-button">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
            {/* Example icon for banners (you might need a specific one) */}
            <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 6h5v4H4V6zm6 0h5v4h-5V6zm6 0h5v4h-5V6zm-12 6h5v4H4v-4zm6 0h5v4h-5v-4zm6 0h5v4h-5v-4z" />
          </svg>
          promo_banners
        </button>

        <div className="upload-controls">
          <label htmlFor="fileInput" className="choose-file-label">
            Choose File:
          </label>
          <input type="file" id="fileInput" onChange={handleFileChange} />
          <span>{selectedFile ? selectedFile.name : 'No file chosen'}</span>
          <button className="btn btn-success" onClick={handleSave} >
            Save
          </button>
        </div>

        <p className="note">
          Note: Standard image size must be 600 x 300 pixels.
        </p>
      </div>

      <div className="banners-list">
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.srNo}>
                <td>{banner.srNo}</td>
                <td>
                  <img src={banner.image} alt={`Banner ${banner.srNo}`} className="banner-image" />
                </td>
                <td>{banner.action}</td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr>
                <td colSpan={3}>No promotion banners added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromotionBanners;