"use client";

import React, { useState, useEffect } from "react";
import "../components/buyer.css";
import "@/components/styles/p1b.css"
import "@/components/styles/p1a.css"
import "@/components/styles/p1c.css"
import BDash from "../components/BDash";
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
    minimumQuantity: "",
    description: "",
  });

  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);
  const [pastPurchases, setPastPurchases] = useState([
    {
      farmerName: 'Sample Farmer',
      cropType: 'Wheat',
      quantityTaken: 500,
      totalAmount: 2500,
},]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch("/api/buyerProfile");
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        setFormData({
          ...formData,
          category: data.category || "",
          paymentTerms: data.paymentTerms || "Cash",
          location: data.location || "",
          address: data.address || "",
          startingMonth: data.startingMonth || "january",
          endingMonth: data.endingMonth || "january",
          minimumQuantity: data.minimumQuantity || "",
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          <img src={formData.profilePic} alt="Profile Pic" />
        </div>

        <div className="profile-detailss">
          <h2>Hello, I'm {formData.username}</h2>
          <p>{formData.description}</p>
          <h3>{formData.email}</h3>
        </div>
      </div>

      {/* Display other fetched details */}
      <div className="details-group text-center mb-4" >
        <p className="mb-6"><strong>Preferred Crops:</strong> {formData.category}</p>
        <p className="mb-6"><strong>Payment Terms:</strong> {formData.paymentTerms}</p>
        <p className="mb-6"><strong>Address:</strong> {formData.address}</p>
        <p className="mb-6"><strong>City:</strong> {formData.location}</p>
        <p className="mb-6"><strong>Minimum Quantity:</strong> {formData.minimumQuantity}</p> {/* Updated field */}
        <p className="mb-6"><strong>Start Month:</strong> {formData.startingMonth}</p> {/* Added start month */}
        <p className="mb-6"><strong>End Month:</strong> {formData.endingMonth}</p> {/* Added end month */}
      </div>
     
      {/* Past Purchases Section */}
      <div className="purchases-section text-center" id="past-purchases-section">
        <h2 className="font-bold">Past Purchases</h2>
        <div className="purchases-container">
          {pastPurchases.length > 0 ? (
            pastPurchases.map((purchase, index) => (
              <div className="purchase-card " key={index}>
                <h3 className="mb-4">Farmer: {purchase.farmerName}</h3>
                <p className="mb-4">Crop Type: {purchase.cropType}</p>
                <p className="mb-4">Quantity Taken: {purchase.quantityTaken} kg</p>
                <p className="mb-4">Total Amount: Rs:{purchase.totalAmount}</p>
              </div>
            ))
          ) : (
            <p>No past purchases available.</p>
          )}
        </div>
      </div>
      <Link href={"/updateBuyerProfile"}>
      <div className="form-group">
              <button type="submit" className="text-white">Edit</button>
            </div>
            </Link>
    </div>
  </div>
        );
};

        export default BuyerProfile;
