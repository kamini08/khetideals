import Link from "next/link";
import React from "react";

const LDash = () => {
  return (
    <div className="farmer-dashboard">
      <Link href="/landHolderAddLand">
        <div className="dashboard-box">
          <h3>
            <strong>Add Land Requirement</strong>
          </h3>
          <p>Specify your land needs and get offers.</p>
        </div>
      </Link>
      <Link href="/myland">
        <div className="dashboard-box">
          <h3>
            <strong>My Profile</strong>
          </h3>
          <p>Review your profile.</p>
        </div>
      </Link>
      <Link href="/landHolderDashboard">
        <div className="dashboard-box">
          <h3>
            <strong>Available Sharecroppers</strong>
          </h3>
          <p>Search for sharecroppers in your area .</p>
        </div>
      </Link>

      <Link href="/landHolderDashboard/#work-status-section">
        <div className="dashboard-box">
          <h3>
            <strong>Status of Work</strong>
          </h3>
          <p>Track the progress of sowing, growing, and harvesting.</p>
        </div>
      </Link>
      <Link href="/feedback">
        <div className="dashboard-box">
          <h3>
            <strong>Fill Feedback</strong>
          </h3>
          <p>Provide feedback on your farming operations.</p>
        </div>
      </Link>
      <Link href="/myLand#ongoing-contracts-section">
        <div className="dashboard-box">
          <h3>
            <strong>My Contracts</strong>
          </h3>
          <p>Review your ongoing and previous contracts</p>
        </div>
      </Link>
      <Link href="/payment">
        <div className="dashboard-box">
          <h3>
            <strong>Make a Payment</strong>
          </h3>
          <p>Initiate and process payments securely.</p>
        </div>
      </Link>
      <Link href="/dashboard">
        <div className="dashboard-box">
          <h3>
            <strong>Go back</strong>
          </h3>
          <p>Get back to buyers's profile to purchase crops</p>
        </div>
      </Link>
    </div>
  );
};

export default LDash;
