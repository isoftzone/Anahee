import React, { useState } from 'react';
interface AddMinimumBillingProps {}
interface BillingState {
  regularBill: string;
  onlineRetail: string;
  onlineWholesale: string;
  onlineWholesalePrepaid: string;
  offlineRetail: string;
  offlineWholesale: string;
}
const initialBilling: BillingState = {
  regularBill: '500.00',
  onlineRetail: '500',
  onlineWholesale: '500',
  onlineWholesalePrepaid: '500',
  offlineRetail: '500',
  offlineWholesale: '500',
};
const MinimumBillingSetting: React.FC<AddMinimumBillingProps> = () => {
  const [billing, setBilling] = useState<BillingState>(initialBilling);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBilling((prevBilling) => ({
      ...prevBilling,
      [name]: value,
    }));
  };
  const handleUpdate = () => {
    console.log('Updating minimum billing:', billing);
    // In a real application, you would send this data to your backend API.
    alert('Minimum billing updated successfully!');
  };
  const handleReset = () => {
    setBilling(initialBilling);
  };
  return (
    <div className="add-minimum-billing-page">
      <h1>Add Minimum Billing</h1>
      <div className="billing-form">
        <div className="form-group">
          <label htmlFor="regularBill">Regular Bill *</label>
          <input
            type="text"
            id="regularBill"
            name="regularBill"
            value={billing.regularBill}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="onlineRetail">Online Retail</label>
          <input
            type="text"
            id="onlineRetail"
            name="onlineRetail"
            value={billing.onlineRetail}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="onlineWholesale">Online Wholesale</label>
          <input
            type="text"
            id="onlineWholesale"
            name="onlineWholesale"
            value={billing.onlineWholesale}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="onlineWholesalePrepaid">Online Wholesale Prepaid</label>
          <input
            type="text"
            id="onlineWholesalePrepaid"
            name="onlineWholesalePrepaid"
            value={billing.onlineWholesalePrepaid}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="offlineRetail">Offline Retail</label>
          <input
            type="text"
            id="offlineRetail"
            name="offlineRetail"
            value={billing.offlineRetail}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="offlineWholesale">Offline Wholesale</label>
          <input
            type="text"
            id="offlineWholesale"
            name="offlineWholesale"
            value={billing.offlineWholesale}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-group">
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default MinimumBillingSetting;
