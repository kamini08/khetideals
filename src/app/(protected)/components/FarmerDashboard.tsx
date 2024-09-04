import React from "react";
import "./dash.css"; // Make sure to link the updated CSS file

const FarmerDashboard = ({ onSectionClick }: any) => {
  return (
    <div className="farmer-dashboard">
      <div
        className="dashboard-box"
        onClick={() => onSectionClick("profile-section")}
      >
        <h3>Manage Profile</h3>
        <p>Update your profile and farming details.</p>
      </div>
      <div
        className="dashboard-box"
        onClick={() => onSectionClick("contracts-section")}
      >
        <h3>Current Contracts</h3>
        <p>View and manage your current contracts.</p>
      </div>
      <div
        className="dashboard-box"
        onClick={() => onSectionClick("search-section")}
      >
        <h3>Search Potential Buyers</h3>
        <p>Explore new farming opportunities and buyers.</p>
      </div>

      <div className="dashboard-box">
        <h3>Transaction History</h3>
        <p>Review your past transactions and earnings.</p>
      </div>
    </div>
  );
};

export default FarmerDashboard;
