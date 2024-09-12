"use client";

import Link from "next/link";
import "./buyer.css";
import { useEffect, useState } from "react";

const BuyerSidebar = () => {
  const [profile, setProfile] = useState<boolean>(false);
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch("/api/buyerProfile");
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        if (data) {
          setProfile(true);
        } else {
          setProfile(false);
        }
      } catch (error: any) {
        // setError(error.message);
      }
    };

    fetchDocument();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="farmer-profile">Buyer Profile</h2>
      {/* <BuyerDashboard /> */}
      <div className="farmer-dashboard">
        {!profile ? (
          <Link href="/buyerManageProfile">
            <div className="dashboard-box">
              <h3>Manage Profile</h3>
              <p>Setup your profile and farming details.</p>
            </div>
          </Link>
        ) : (
          <Link href="/buyerProfile">
            <div className="dashboard-box">
              <h3>My Profile</h3>
              <p>Update your profile and farming details.</p>
            </div>
          </Link>
        )}

        {/* <div className="dashboard-box">
<h3>Signed Contracts</h3>
<p>View and manage your signed contracts.</p>
</div> */}
        <div className="dashboard-box">
          <h3>Available Farmers </h3>
          <p>Browse and contact available farmeres.</p>
        </div>
        <div className="dashboard-box">
          <h3>Make a Payment</h3>
          <p>Initiate and process payments securely.</p>
        </div>
        <Link href="">
          <div className="dashboard-box">
            <h3>Be a Landlord???</h3>
            <p>
              Register yourself as a Landlord and make sharecroppers work on the
              land.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BuyerSidebar;
