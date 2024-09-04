import React from "react";
import "../components/buyer.css";

const FarmerProfile = () => {
  return (
    <div className="form-container">
      <h2>Fill further details</h2>
      <form>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" />
        </div>

        <div className="form-group">
          <label htmlFor="payment-terms">Payment Terms</label>
          <select id="payment-terms" name="payment-terms">
            <option value="full">Full Payment</option>
            <option value="half">Half Payment</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" />
        </div>

        <div className="form-group inline-group">
          <div className="form-group">
            <label htmlFor="start-month">Start Month</label>
            <select id="start-month" name="start-month">
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="Agust">Agust</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="end-month">End Month</label>
            <select id="end-month" name="end-month">
              <option value="January">January</option>
              <option value="Febraury">Febraury</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="Agust">Agust</option>
              <option value="September">Sepetember</option>
              <option value="October">October</option>
              <option value="November">Novemebr</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description"></textarea>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FarmerProfile;
