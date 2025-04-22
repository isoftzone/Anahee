import React, { useState } from 'react';
// import '../tailwind.css'; // Optional: For more specific styling
import { useNavigate } from 'react-router-dom'; // For navigation
interface Company {
  srNo: number;
  companyName: string;
  buildingNoOfficeNo: string;
  buildingName: string;
  street: string;
  city: string;
  pincode: string;
  emailId: string;
  mobileNumber: string;
  action: React.ReactNode; // For the edit and delete buttons
}
const initialCompanies: Company[] = [
  {
    srNo: 1,
    companyName: 'Isotzone',
    buildingNoOfficeNo: '454',
    buildingName: 'Apollo Tower, 5th Floor',
    street: '2, MG Road',
    city: 'Indore',
    pincode: '452001',
    emailId: 'isotzone@gmail.com',
    mobileNumber: '7415564456',
    action: (
      <div>
        <button className="edit-button">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            {/* Replace with your edit icon SVG path */}
            <path d="M15.72 23.28a1 1 0 001.41 0l2.83-2.83a1 1 0 000-1.41L5.75 3.88a2 2 0 00-2.83 0L1.12 6.51a2 2 0 000 2.83L15.72 23.28zM13.59 17.58l-4.24 4.24-1.41-1.41 4.24-4.24 1.41 1.41zm4.24-4.24l-4.24 4.24-1.41-1.41 4.24-4.24 1.41 1.41zM17.83 9.75l-4.24 4.24-1.41-1.41 4.24-4.24 1.41 1.41z" />
          </svg>
        </button>
        <button className="delete-button">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            {/* Replace with your delete icon SVG path */}
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </div>
    ),
  },
  // ... more companies would go here
];
interface CompanyListProps {}
const CustomerList: React.FC<CompanyListProps> = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState(initialCompanies);
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const handleAddCompanyClick = () => {
    navigate('/add-company'); // Assuming you have a route set up for '/add-company'
  };
  const handleShowEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowEntries(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };
  // Implement logic to filter and paginate the companies based on showEntries, searchTerm, and currentPage
  const filteredCompanies = companies.filter((company) =>
    Object.values(company).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCompanies.length / showEntries);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="company-list-page">
      <h1>Company List</h1>
      <button className="add-company-button" onClick={handleAddCompanyClick}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
          {/* Replace with your add icon SVG path */}
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0V12h-6.75a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
        Add Company
      </button>
      <div className="list-controls">
        <div className="show-entries">
          Show
          <select value={showEntries} onChange={handleShowEntriesChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          entries
        </div>
        <div className="search-bar">
          Search: <input type="text" className='form-control' value={searchTerm} onChange={handleSearchChange} />
        </div>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Sr. no</th>
              <th>Company Name</th>
              <th>Building No/Office No</th>
              <th>Building Name</th>
              <th>Street</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Email Id</th>
              <th>Mobile Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company) => (
              <tr key={company.srNo}>
                <td>{company.srNo}</td>
                <td>{company.companyName}</td>
                <td>{company.buildingNoOfficeNo}</td>
                <td>{company.buildingName}</td>
                <td>{company.street}</td>
                <td>{company.city}</td>
                <td>{company.pincode}</td>
                <td>{company.emailId}</td>
                <td>{company.mobileNumber}</td>
                <td>{company.action}</td>
              </tr>
            ))}
            {currentCompanies.length === 0 && (
              <tr>
                <td colSpan={10}>No matching companies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="list-pagination">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredCompanies.length)} of {filteredCompanies.length} entries
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default CustomerList;
