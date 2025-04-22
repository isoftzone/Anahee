import React, { useState, useEffect } from 'react';
// import '../tailwind.css'; // Optional: For more specific styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  srNo: number;
  FNAME: string;
  LNAME: string;
  EMAIL: string;
  MOBILE: string;
  gender: string;
  status: 'Verified' | 'Unverified';
  id: number; // Unique identifier
}

const Users: React.FC = () => {

  
     const navigate = useNavigate();
    
      const handleClick = () => {
        // You can perform other actions here before navigating
        // window.alert('Button clicked!');
        navigate('/components/Register'); // Replace '/CustomerList-page' with the desired route
      };
  
  
  const [users, setUsers] = useState<User[]>([]);
  const [showRows, setShowRows] = useState(10);
  const [searchStatus, setSearchStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/get_userMaster`); // Your API endpoint
        console.log("response",response)
        setUsers(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch users');
        setLoading(false);
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleShowRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowRows(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleEditUser = (id: number) => {
    console.log(`Edit user with ID: ${id}`);
    alert(`Navigating to edit page for user ID: ${id}`);
    // In a real application, you would navigate to an edit form.
  };

  const handleDeleteUser = (id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete user with ID: ${id}?`);
    if (confirmDelete) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      console.log(`Deleted user with ID: ${id}`);
      // In a real application, you would make an API call to delete the user.
    }
  };

  // Implement logic to filter and paginate users
  const filteredUsers = users.filter((user) => {
    const searchMatch = Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const statusMatch = searchStatus === '' || user.status.toLowerCase() === searchStatus.toLowerCase();
    return searchMatch && statusMatch;
  });

  const startIndex = (currentPage - 1) * showRows;
  const endIndex = startIndex + showRows;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / showRows);

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

  if (loading) {
    return <div className="loading">Loading Users...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-list-page">
      <h1>User List</h1>

      <div className="action-bar">
        <button className="add-user-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
          ➕ Add User
        </button>
      </div>

      <div className="filter-bar flex flex-wrap gap-4 mb-4">
        <div className="status-filter flex items-center gap-2">
          Search By Status:
          <select
            value={searchStatus}
            onChange={handleSearchStatusChange}
            className="border rounded py-1 px-2"
          >
            <option value="">All</option>
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>
        <div className="export-buttons flex items-center gap-2">
          Show
          <select
            value={showRows}
            onChange={handleShowRowsChange}
            className="border rounded py-1 px-2"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          rows
          {/* Placeholder for other export buttons */}
          {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Csv</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Copy</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Excel</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">PDF</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Column visibility</button> */}
        </div>
        <div className="search-bar flex items-center gap-2">
          Search: <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="border rounded py-1 px-2"
          />
        </div>
      </div>

      <div className="table-responsive overflow-x-auto">
        <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Sr.No</th>
              <th className="py-3 px-6 text-left">FNAME</th>
              <th className="py-3 px-6 text-left">LNAME</th>
              <th className="py-3 px-6 text-left">EMAIL</th>
              <th className="py-3 px-6 text-left">MOBILE</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.srNo}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.FNAME}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.LNAME}</td>
                <td className="py-3 px-6 text-left">{user.EMAIL}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.MOBILE}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.gender}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className={`bg-${user.status === 'Verified' ? 'green' : 'red'}-200 text-${user.status === 'Verified' ? 'green' : 'red'}-700 py-1 px-3 rounded-full text-xs`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="w-8 h-8 mr-2 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-700"
                    >
                      📝
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="w-8 h-8 rounded-full bg-red-200 hover:bg-red-300 text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={8} className="py-3 px-6 text-center">Loading users...</td>
              </tr>
            )}
            {!loading && currentUsers.length === 0 && (
              <tr>
                <td colSpan={8} className="py-3 px-6 text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="list-pagination flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} entries
        </div>
        <div className="pagination-controls flex items-center gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1 || loading}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50`}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0 || loading}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;