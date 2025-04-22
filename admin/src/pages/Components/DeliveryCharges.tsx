import React, { useState } from 'react';
// import '../tailwind.css'; // Optional: For more specific styling

interface ShippingRate {
  srNo: number;
  from: number;
  to: number;
  rate: number;
  action: React.ReactNode; // For the delete button
}

interface ShippingRatesProps {}

const initialRates: ShippingRate[] = [
  { srNo: 1, from: 5, to: 10, rate: 50, action: <button className="delete-button">🗑️</button> },
  { srNo: 2, from: 10, to: 50, rate: 100, action: <button className="delete-button">🗑️</button> },
  { srNo: 3, from: 50, to: 1000, rate: 500, action: <button className="delete-button">🗑️</button> },
  // ... more rates
];

const DeliveryCharges: React.FC<ShippingRatesProps> = () => {
  const [rates, setRates] = useState(initialRates);
  const [newFrom, setNewFrom] = useState('');
  const [newTo, setNewTo] = useState('');
  const [newRate, setNewRate] = useState('');
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddRate = () => {
    if (newFrom && newTo && newRate && !isNaN(Number(newFrom)) && !isNaN(Number(newTo)) && !isNaN(Number(newRate))) {
      const newRateEntry: ShippingRate = {
        srNo: rates.length + 1,
        from: Number(newFrom),
        to: Number(newTo),
        rate: Number(newRate),
        action: <button className="delete-button">🗑️</button>, // Basic delete button
      };
      setRates([...rates, newRateEntry]);
      setNewFrom('');
      setNewTo('');
      setNewRate('');
    } else {
      alert('Please enter valid numeric values for Distance From, Distance To, and Shipping Rate.');
    }
  };

  const handleDeleteRate = (srNoToDelete: number) => {
    setRates(rates.filter((rate) => rate.srNo !== srNoToDelete));
  };

  const handleShowEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowEntries(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredRates = rates.filter((rate) =>
    Object.values(rate).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const currentRates = filteredRates.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredRates.length / showEntries);

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
    <div className="shipping-rates-page">
      <h1>Shipping Rates</h1>

      <div className="add-rate-section">
        <input
          type="text"
          placeholder="Distance From in KM"
          value={newFrom}
          onChange={(e) => setNewFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Distance To in KM"
          value={newTo}
          onChange={(e) => setNewTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Shipping Rate"
          value={newRate}
          onChange={(e) => setNewRate(e.target.value)}
        />
        <button className="save-button" onClick={handleAddRate}>
          Save
        </button>
      </div>

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
              <th>From</th>
              <th>To</th>
              <th>Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRates.map((rate) => (
              <tr key={rate.srNo}>
                <td>{rate.srNo}</td>
                <td>{rate.from}</td>
                <td>{rate.to}</td>
                <td>{rate.rate}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteRate(rate.srNo)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {currentRates.length === 0 && (
              <tr>
                <td colSpan={5}>No shipping rates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="list-pagination">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredRates.length)} of {filteredRates.length} entries
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

export default DeliveryCharges;