import React from "react";
// import "../components/shareCropperSidebar"
import "@/components/styles/p2a.css";
import Link from "next/link";

const SDash = () => {
  return (
    <div className="farmer-dashboard">
      <div className="dashboard-box">
        <Link href="/shareCropperManageProfile">
          <h3>
            <strong>Manage Profile</strong>
          </h3>
          <p>update your profile.</p>
        </Link>
      </div>
      <Link href="/shareCropperProfile">
        <div className="dashboard-box">
          <h3>
            <strong>My Profile</strong>
          </h3>
          <p>Review your profile.</p>
        </div>
      </Link>
      <Link href="/ShareCropperDashboard">
        <div className="dashboard-box">
          <h3>
            <strong>Available Landlord's plot</strong>
          </h3>
          <p>Search for available lands to work.</p>
        </div>
      </Link>
      <Link href="/ShareCropperDashboard#ongoing-contracts-section">
        <div className="dashboard-box">
          <h3>
            <strong>My contracts</strong>
          </h3>
          <p>View all your contracts</p>
        </div>
      </Link>

      <div className="dashboard-box">
        <h3>
          <strong>Review</strong>
        </h3>
        <p>Provide and view reviews of your services.</p>
      </div>
      <div className="dashboard-box">
        <h3>
          <strong>Status of Work</strong>
        </h3>
        <p>Track the progress of sowing, growing, and harvesting.</p>
      </div>
      <Link href="/dashboard">
        <div className="dashboard-box">
          <h3>
            <strong>Go back</strong>
          </h3>
          <p>Get back to farmer's profile to sell your crops</p>
        </div>
      </Link>
    </div>
  );
};

export default SDash;
