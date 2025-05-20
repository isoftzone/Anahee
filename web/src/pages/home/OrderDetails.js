import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderDetailsPage = () => {
  return (
    <div
      className="container-fluid m-5 p-5 "
      style={{ backgroundColor: "#F0F0F0" }}
    >
      <p>
        Order <strong>#6922</strong> was placed on <strong>May 19, 2025</strong>{" "}
        and is currently <strong>Processing</strong>.
      </p>

      <h5 className="mt-4 fs-3">Order details</h5>

      <div className="table-responsive">
        <table className="table">
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th className={"px-5 fs-4 fw-bold"}>Product</th>
              <th className="text-end px-5">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={"px-5"}>
                <h5>Ergonomic Steel Computer × 1</h5>
                <h5>Vendor: Book Lovers Hub</h5>
              </td>
              <td className="text-end align-middle px-5">
                <h5>$583.06</h5>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ backgroundColor: "#f8f9fa" }}>
                <h5 className={"px-5"}>
                  Ea autem ut nobis qui autem. Dolorum et maiores magnam eaque
                  perspiciatis.
                </h5>
              </td>
            </tr>
            <tr>
              <td className={"px-5 fs-4"}>
                <strong>Subtotal:</strong>
              </td>
              <td className="text-end px-5">
                <h5>$583.06</h5>
              </td>
            </tr>
            <tr>
              <td className={"px-5 fs-4"}>
                <strong>Payment method:</strong>
              </td>
              <td className="text-end px-5">
                <h5>Cash on delivery</h5>
              </td>
            </tr>
            <tr>
              <td className={"px-5 fs-4"}>
                <strong>Total:</strong>
              </td>
              <td className="text-end px-5">
                <h5>$583.06</h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-5" style={{ backgroundColor: "#f8f9fa" }}>
        <h5 className="mt-5 fs-3">Billing address</h5>
        <address className="fs-5">
          qws
          <br />
          sqw sqws
          <br />
          w3r
          <br />
          qw
          <br />
          select CCITY 452011
          <br />
          Delhi, India
          <br />
          +91433422432
          <br />
          test@gmail.com
        </address>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
