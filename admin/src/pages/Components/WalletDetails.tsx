import React, { useState } from 'react';
// import '../tailwind.css'; // Optional: For more specific styling

interface WalletDetail {
  srNo: number;
  type: string;
  amount: number;
  walletFrom: string;
  walletTo: string;
  status: 'Active' | 'InActive';
  id: number; // Unique identifier for each wallet detail
}

const initialWalletDetails: WalletDetail[] = [
  { srNo: 1, type: 'registration', amount: 500, walletFrom: '2020-06-01', walletTo: '2020-12-31', status: 'Active', id: 1 },
  { srNo: 2, type: 'referral', amount: 500, walletFrom: '2020-06-01', walletTo: '2021-01-31', status: 'Active', id: 2 },
  { srNo: 3, type: 'registration', amount: 1000, walletFrom: '2020-07-01', walletTo: '2021-02-28', status: 'InActive', id: 3 },
  { srNo: 4, type: 'registration', amount: 500, walletFrom: '2021-04-01', walletTo: '2021-04-30', status: 'InActive', id: 4 },
  { srNo: 5, type: 'registration', amount: 100, walletFrom: '2021-03-29', walletTo: '2021-04-05', status: 'InActive', id: 5 },
  { srNo: 6, type: 'registration', amount: 4550, walletFrom: '2021-07-16', walletTo: '2021-07-24', status: 'Active', id: 6 },
];

const WalletDetail: React.FC = () => {
  const [walletDetails, setWalletDetails] = useState(initialWalletDetails);
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleShowEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowEntries(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleToggleStatus = (id: number) => {
    setWalletDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.id === id ? { ...detail, status: detail.status === 'Active' ? 'InActive' : 'Active' } : detail
      )
    );
    console.log(`Toggled status for ID: ${id}`);
    // In a real application, you would likely make an API call here.
  };

  const handleViewDetails = (id: number) => {
    console.log(`View details for ID: ${id}`);
    alert(`Viewing details for Wallet Detail ID: ${id}`);
    // In a real application, you would navigate to a details page or show a modal.
  };

  // Implement logic to filter and paginate the wallet details
  const filteredWalletDetails = walletDetails.filter((detail) =>
    Object.values(detail).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const currentWalletDetails = filteredWalletDetails.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredWalletDetails.length / showEntries);

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
    <div className="wallet-details-list-page">
      <h1>Wallet Details List</h1>

      <button className="add-wallet-details-button">
        ➕ Add Wallet Details
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
          Search: <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </div>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Wallet From</th>
              <th>Wallet To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentWalletDetails.map((detail) => (
              <tr key={detail.id}>
                <td>{detail.srNo}</td>
                <td>{detail.type}</td>
                <td>{detail.amount}</td>
                <td>{detail.walletFrom}</td>
                <td>{detail.walletTo}</td>
                <td>{detail.status}</td>
                <td>
                  <button className="view-button me-1" onClick={() => handleViewDetails(detail.id)}>
                    🖍
                  </button>
                  <button
                    className={`toggle-button ${detail.status === 'Active' ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleStatus(detail.id)}
                  >
                    {detail.status === 'Active' ? '📝' : '📝'}
                  </button>
                </td>
              </tr>
            ))}
            {currentWalletDetails.length === 0 && (
              <tr>
                <td colSpan={7}>No wallet details found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="list-pagination">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredWalletDetails.length)} of {filteredWalletDetails.length} entries
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

export default WalletDetail;