"use client";

import React, { useState, useEffect } from "react";
// import "../components/buyer.css";
import "@/components/styles/p1b.css";
import "@/components/styles/p1a.css";
import BDash from "../components/BDash";
import { toast } from "react-toastify";

interface UserData {
  name: string;
  email: string;
}
const BuyerProfile = () => {
  // State to hold form data
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    profilePic:
      "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?size=626&ext=jpg&ga=GA1.1.1974988790.1724696296&semt=ais_hybrid",

    username: "John Doe",
    email: "john.doe@example.com",
    category: "",
    paymentTerms: "Cash", // Default to first enum value
    location: "",
    address: "",
    startingMonth: "january", // Default to January
    endingMonth: "january", // Default to January
    minimumQuantity: "",
    description: "",
  });

  useEffect(() => {
    // Function to fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/updateBuyerProfile"); // Change to your actual API endpoint

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // console.log(data.data);
        setUserData(data.data); // Access the data structure returned from the API
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  // Handle form field changes
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

  // Handle form submission
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

      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Optionally, reset form after successful submission
      setFormData({
        ...formData,
        category: "",
        paymentTerms: "Cash",
        location: "",
        address: "",
        startingMonth: "january",
        endingMonth: "january",
        minimumQuantity: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error in submitting the form", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <h2 className="farmer-profile">Buyer Profile</h2>
          <BDash />
        </div>

        <div className="main-content form-background">
          {" "}
          {/* Added class 'form-background' for background styling */}
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-pic">
              <img src={formData.profilePic} alt="Profile Pic" />
            </div>
            <div className="profile-details">
              <h3 id="username">
                <span>Name:</span> {userData?.name}
              </h3>
              <p id="email">
                <span>Email:</span> {userData?.email}
              </p>
            </div>
          </div>
          <div className="form-container">
            <div className="edit">
              <h2>Fill further details</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  className="text-black"
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter your crop"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="paymentTerms">Payment Terms</label>
                <select
                  className="text-black"
                  id="paymentTerms"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                  <option value="Installments">Installments</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">City</label>
                <input
                  className="text-black"
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  className="text-black"
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address"
                />
              </div>

              <div className="form-group inline-group">
                <div className="form-group">
                  <label htmlFor="startingMonth">Start Month</label>
                  <select
                    className="text-black"
                    id="startingMonth"
                    name="startingMonth"
                    value={formData.startingMonth}
                    onChange={handleChange}
                    required
                  >
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="endingMonth">End Month</label>
                  <select
                    className="text-black"
                    id="endingMonth"
                    name="endingMonth"
                    value={formData.endingMonth}
                    onChange={handleChange}
                    required
                  >
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="minimumQuantity">Minimum Quantity</label>
                <input
                  className="text-black"
                  type="number"
                  id="minimumQuantity"
                  name="minimumQuantity"
                  value={formData.minimumQuantity}
                  onChange={handleChange}
                  placeholder="Enter minimum quantity in Qu."
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="text-black"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description about yourself"
                ></textarea>
              </div>

              <div className="form-group text-center">
                <button type="submit" className="text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerProfile;
