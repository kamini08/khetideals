"use client";
import "@/components/styles/p1b.css";
import "@/components/styles/p1a.css";
import "@/components/styles/p1c.css";
import BDash from "../../(protected)/components/BDash";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const UserDetailPage = () => {
  const { userId } = useParams(); // Extract userId from the URL

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pastPurchases, setPastPurchases] = useState([]);
  const [contracts, setContracts] = useState(null);
  const [ongoingContracts, setOngoingContracts] = useState([]);

  const [completedContracts, setCompletedContracts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchContracts = async () => {
      const response = await fetch("/api/contract/getContracts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      const pastData = data.contracts.completedContracts;
      setContracts(data.contracts);
      setPastPurchases(pastData);
      setOngoingContracts(data.contracts.ongoingContracts);
      setCompletedContracts(data.contracts.completedContracts);

      console.log(ongoingContracts);
    };

    fetchContracts();

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  function handleChat(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="buyer-profile">Buyer Profile</h2>
        <BDash />
      </div>

      <div className="main-content form-background">
        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-picc">
            <img
              src="https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?size=626&ext=jpg&ga=GA1.1.1974988790.1724696296&semt=ais_hybrid"
              alt="Profile Pic"
            />
          </div>

          <div className="profile-detailss">
            <h2>Hello, I'm {userData.userDetails?.name}</h2>
            <p>{userData.description}</p>
            <h3>{userData.userDetails?.email}</h3>
          </div>
        </div>
        <div className="details-group text-center mb-4">
          <p className="mb-6">
            <strong>Preferred Crops:</strong> {userData.category}
          </p>
          <p className="mb-6">
            <strong>Payment Terms:</strong> {userData.paymentTerms}
          </p>
          <p className="mb-6">
            <strong>Address:</strong> {userData.address}
          </p>
          <p className="mb-6">
            <strong>City:</strong> {userData.location}
          </p>
          <p className="mb-6">
            <strong>Minimum Quantity:</strong> {userData.minimumQuantity}
          </p>{" "}
          {/* Updated field */}
          <p className="mb-6">
            <strong>Start Month:</strong> {userData.startingMonth}
          </p>{" "}
          {/* Added start month */}
          <p className="mb-6">
            <strong>End Month:</strong> {userData.endingMonth}
          </p>{" "}
          {/* Added end month */}
        </div>

        {/* Past Purchases Section */}
        <div
          className="purchases-section text-center"
          id="past-purchases-section"
        >
          <h2 className="font-bold">Past Purchases</h2>
          <div className="purchases-container">
            {pastPurchases.length > 0 ? (
              pastPurchases.map((purchase, index) => (
                <div className="purchase-card " key={index}>
                  <h3 className="mb-4">Farmer: {purchase["seller"]["name"]}</h3>
                  <p className="mb-4">
                    Crop Type: {purchase["product"]["cropType"]}
                  </p>
                  <p className="mb-4">
                    Quantity Taken: {purchase["product"]["quantity"]} kg
                  </p>
                  <p className="mb-4">
                    Total Amount: Rs:{purchase["product"]["totalPrice"]}
                  </p>
                </div>
              ))
            ) : (
              <p>No past purchases available.</p>
            )}
          </div>
        </div>
        <div className="form-group text-center">
          <Link href={`/chat/${userId}`}>
            <button type="button" className="text-white">
              Chat with the person
            </button>
          </Link>
        </div>
        <Link href="/proposalForm">
          <div className="form-group text-center">
            <button type="button" className="text-white">
              Make a propasal of a contract
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDetailPage;
