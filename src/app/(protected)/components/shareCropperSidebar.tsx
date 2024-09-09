import React from 'react'
import "./buyer.css"; 

const shareCropper = ({ onSectionClick }: any) => {
  return (
    <div>
        <div className="farmer-dashboard">
      <div className="dashboard-box" onClick={() => onSectionClick('profile-section')}>
        <h3>My Profile</h3>
        <p>Review your profile.</p>
      </div>
      <div className="dashboard-box" onClick={() => onSectionClick('service-history')}>
  <h3>Service History</h3>
  <p>View and review your service history.</p>
</div>

<div className="dashboard-box" onClick={() => onSectionClick('review-section')}>
  <h3>Review</h3>
  <p>Provide and view reviews of your services.</p>
</div>

<div className="dashboard-box" onClick={() => onSectionClick('status-of-work')}>
  <h3>Status of Work</h3>
  <p>Track the progress of sowing, growing, and harvesting.</p>
</div>

    </div>
    </div>
  )
}

export default shareCropper