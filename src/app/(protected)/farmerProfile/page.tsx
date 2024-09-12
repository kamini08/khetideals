"use client";

import React, { useState, useEffect } from "react";
// import "../components/buyer.css";
import "@/components/styles/p1b.css"
import "@/components/styles/p1a.css"
import "@/components/styles/p1c.css"
import FDash from "../components/FDash";
import Link from "next/link";

const BuyerProfile = () => {
  const [formData, setFormData] = useState({
    profilePic: 'https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?size=626&ext=jpg&ga=GA1.1.1974988790.1724696296&semt=ais_hybrid',

    username: "John Doe",
    email: "john.doe@example.com",
    category: "",
    paymentTerms: "Cash",
    location: "",
    address: "",
    startingMonth: "january",
    endingMonth: "january",

    description: "",
  });

  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);
  const [ongoingContracts, setOngoingContracts] = useState([
    {
      buyerName: 'Default Buyer',
      cropType: 'Wheat',
      quantity: 1000,
      price: 2000,
      status: 'ongoing',
    }
  ]);

  const [completedContracts, setCompletedContracts] = useState([
    {
      buyerName: 'Previous Buyer',
      cropType: 'Corn',
      quantity: 500,
      price: 1500,
      status: 'completed',
    }
  ]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch("/api/farmerProfile");
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        setFormData({
          profilePic: 'https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?size=626&ext=jpg&ga=GA1.1.1974988790.1724696296&semt=ais_hybrid',

          username: "John Doe",
          email: "john.doe@example.com",
          category: data.category || "",
          paymentTerms: data.paymentTerms || "Cash",
          location: data.location || "",
          address: data.address || "",
          startingMonth: data.startingMonth || "january",
          endingMonth: data.endingMonth || "january",

          description: data.description || "",
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/updateBuyerProfile", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-center">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="sidebar">
       <FDash />
      </div>

      <div className="main-content form-background">
        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-picc">
            <img src={formData.profilePic} alt="Profile Pic" />
          </div>

          <div className="profile-detailss">
            <h2>Hello, I'm {formData.username}</h2>
            <p>{formData.description}</p>
            <h3>{formData.email}</h3>
          </div>
        </div>

        {/* Display other fetched details */}
        <div className="details-group  text-center mb-4">
          <p className="mb-6"><strong>Category:</strong> {formData.category}</p>
          <p className="mb-6"><strong>Payment Terms:</strong> {formData.paymentTerms}</p>
          <p className="mb-6"><strong>Address:</strong> {formData.address}</p>
          <p className="mb-6"><strong>City:</strong> {formData.location}</p> {/* Display location */}
          <p className="mb-6"><strong>Start Month:</strong> {formData.startingMonth}</p>
          <p className="mb-6"><strong>End Month:</strong> {formData.endingMonth}</p>
        </div>

        {/* Ongoing Contracts Section */}
        <div className="contracts-section text-center" id="ongoing-contracts-section">
          <h2><strong>Ongoing Contracts</strong></h2>
          <div className="contracts-container">
            {ongoingContracts.length > 0 ? (
              ongoingContracts.map((contract, index) => (
                <div className="contract-card" key={index}>
                  <h3 className="mb-4">Buyer: {contract.buyerName}</h3>
                  <p className="mb-4">Crop Type: {contract.cropType}</p>
                  <p className="mb-4">Quantity: {contract.quantity} kg</p>
                  <p className="mb-4">Price: ${contract.price}</p>
                  <p className="mb-4">Status: {contract.status}</p>
                </div>
              ))
            ) : (
              <p>No ongoing contracts.</p>
            )}
          </div>
        </div>

        {/* Completed Contracts Section */}
        <div className="contracts-section text-center" id="completed-contracts-section">
          <h2><strong>Completed Contracts</strong></h2>
          <div className="contracts-container">
            {completedContracts.length > 0 ? (
              completedContracts.map((contract, index) => (
                <div className="contract-card" key={index}>
                  <h3>Buyer: {contract.buyerName}</h3>
                  <p>Crop Type: {contract.cropType}</p>
                  <p>Quantity: {contract.quantity} kg</p>
                  <p>Price: ${contract.price}</p>
                  <p>Status: {contract.status}</p>
                </div>
              ))
            ) : (
              <p>No completed contracts.</p>
            )}
          </div>
        </div>
        <Link href="/updateFarmerProfile">
      <div className="form-group text-center">
              <button type="submit" className="text-white">Edit</button>
            </div>
            </Link>
      </div>
    </div>
  );
};

export default BuyerProfile;
