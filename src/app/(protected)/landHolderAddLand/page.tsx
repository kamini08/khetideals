"use client"
import React, { useState } from "react";
import "@/components/styles/p2a.css";
import "@/components/styles/p2b.css";
// import "../components/profilePic.css";
import LDash from "../components/LDash";
// import "../components/shareCropperSidebar"

// Define the types for profile data
interface ProfileData {
  profilePic: string;
  username: string;
  email: string;
  areaOfLand: number;
  location: string;
  adress: string;
  cropToGrow: string;
  soilType:string;
  startingMonth: string;
  endingMonth: string;
  pricePerDecimal:number ;
}

const SharecropperManageProfile: React.FC = () => {
  // Initialize state with type ProfileData
  const [profileData, setProfileData] = useState<ProfileData>({
    profilePic: 'https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?size=626&ext=jpg&ga=GA1.1.1974988790.1724696296&semt=ais_hybrid',
    username: "John Doe",
    email: "john.doe@example.com",
    areaOfLand: 0,
    location: " ",
    adress: " ",
    cropToGrow: " ",
    soilType:" ",
    startingMonth: "january",
    endingMonth:"january",
    pricePerDecimal:0,
    
  });

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/landHolderAddLand", {
        method: "POST",
        body: JSON.stringify(profileData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);

      // Optionally, reset form after successful submission
      setProfileData({
        ...profileData,
        areaOfLand: 0,
    location: " ",
    adress: " ",
    cropToGrow: " ",
    soilType:" ",
    startingMonth: "january",
    endingMonth:"january",
    pricePerDecimal:0,
    
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="farmer-profile"><strong>LandLord Profile</strong></h2>
        <LDash />
       
      </div>

      <div className="main-content form-background">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-pic">
            <img src={profileData.profilePic} alt="Profile Pic" />
          </div>
          <div className="profile-details">
            <h3 id="username">
              <span>Name:</span> {profileData.username}
            </h3>
            <p id="email">
              <span>Email:</span> {profileData.email}
            </p>
          </div>
        </div>

        {/* Form for further details */}
        <div className="form-container">
          <h2><strong>Add land requirements</strong></h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group text-center">
              <label htmlFor="areaOfLand">Area of land</label>
              <input
               className="text-black"
                type="number"
                id="areaOfLand"
                name="areaOfLand"
                value={profileData.areaOfLand}
                onChange={handleChange}
                placeholder="Enter area of land..."
              />
            </div>

            <div className="form-group text-center">
              <label htmlFor="location">City</label>
              <input
               className="text-black"
                type="text"
                id="location"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                placeholder="Enter your city... "
              />
            </div>

            <div className="form-group text-center">
              <label htmlFor="adress">Adress</label>
              <input
               className="text-black"
                type="text"
                id="adress"
                name="adress"
                value={profileData.adress}
                onChange={handleChange}
                placeholder=" Enter your address..."
              />
            </div>

            <div className="form-group text-center">
              <label htmlFor="cropToGrow">Crop To Grow</label>
              <input
               className="text-black"
                type="text"
                id="cropToGrow"
                name="cropToGrow"
                value={profileData.cropToGrow}
                onChange={handleChange}
                placeholder="Enter the crop to be grown..."
              />
            </div>

            <div className="form-group text-center">
              <label htmlFor="soilType">Soil Type</label>
              <input
               className="text-black"
                type="text"
                id="soilType"
                name="soilType"
                value={profileData.soilType}
                onChange={handleChange}
                placeholder="Enter the soil type..."
              />
            </div>

            <div className="form-group inline-group">
              <div className="form-group text-center">
                <label htmlFor="startingMonth">Start Month</label>
                <select
                 className="text-black"
                  id="startingMonth"
                  name="startingMonth"
                  value={profileData.startingMonth}
                  onChange={handleChange}
                >
                  <option value="january">January</option>
                  {/* Other months... */}
                </select>
              </div>

              <div className="form-group text-center">
                <label htmlFor="endingMonth">End Month</label>
                <select
                 className="text-black"
                  id="endingMonth"
                  name="endingMonth"
                  value={profileData.endingMonth}
                  onChange={handleChange}
                >
                  <option value="january">January</option>
                  {/* Other months... */}
                </select>
              </div>
            </div>

            <div className="form-group text-center">
              <label htmlFor="pricePerDecimal">Price per Decimal</label>
              <input
               className="text-black"
                type="number"
                id="pricePerDecimal"
                name="pricePerDecimal"
                value={profileData.pricePerDecimal}
                onChange={handleChange}
                placeholder="Enter price per Decimal"
              />
            </div>

            <div className="form-group text-center">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SharecropperManageProfile;
