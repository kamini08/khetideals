"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/components/styles/p1a.css";

const BDash = () => {
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
    <div>
      {/* <BuyerDashboard /> */}
      <div className="farmer-dashboard">
        {!profile ? (
          <Link href="/buyerManageProfile">
            <div className="dashboard-box">
              <h3>
                <strong>Manage Profile</strong>
              </h3>
              <p>Setup your profile and farming details.</p>
            </div>
          </Link>
        ) : (
          <Link href="/buyerProfile">
            <div className="dashboard-box">
              <h3>
                <strong>My Profile</strong>
              </h3>
              <p>Update your profile and farming details.</p>
            </div>
          </Link>
        )}

        <Link href="/dashboard">
          <div className="dashboard-box">
            <h3>
              <strong>Available Farmers</strong>
            </h3>
            <p>Browse and contact available farmers.</p>
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
        <Link href="/buyerProfile#ongoing-contracts-section">
          <div className="dashboard-box">
            <h3>
              <strong>My Contracts</strong>
            </h3>
            <p>Review your ongoing and previous contracts</p>
          </div>
        </Link>
        <Link href="/landHolderDashboard">
          <div className="dashboard-box">
            <h3>
              <strong>Be a Landlord???</strong>
            </h3>
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
export default BDash;
