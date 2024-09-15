"use client";
import React, { useEffect, useState } from "react";
import "@/components/styles/p2a.css";
import "@/components/styles/p2b.css";
import "@/components/styles/p2c.css";
// import "../components/buyer.css";
// import "../components/profilePic.css";
// import "../components/shareCropperSidebar"
import SDash from "../components/SDash";
import { toast } from "react-toastify";

// Define the types for profile data
interface ProfileData {
  profilePic: string;
  username: string;
  email: string;
  areaOfLand: string;
  location: string;
  startingMonth: string;
  endingMonth: string;
  description: string;
}
interface UserData {
  name: string;
  email: string;
}

const SharecropperManageProfile: React.FC = () => {
  // Initialize state with type ProfileData
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    profilePic:
      "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?size=626&ext=jpg&ga=GA1.1.1974988790.1724696296&semt=ais_hybrid",
    username: "John Doe",
    email: "john.doe@example.com",
    areaOfLand: "",
    location: "",
    startingMonth: "january",
    endingMonth: "january",
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
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/shareCropperManageProfile", {
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
      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Optionally, reset form after successful submission
      setProfileData({
        ...profileData,
        areaOfLand: "",
        location: "",
        startingMonth: "january",
        endingMonth: "january",
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
    <div className="container">
      <div className="sidebar">
        <h2 className="farmer-profile">Sharecropper Profile</h2>
        <SDash />
        {/* <shareCropperSidebar onSectionClick=({handleSidebarClick} /> */}
        {/* <div className="farmer-dashboard">
      <div className="dashboard-box">
        <h3>My Profile</h3>
        <p>Review your profile.</p>
      </div>
      <div className="dashboard-box">
  <h3>Service History</h3>
  <p>View and review your service history.</p>
</div>

<div className="dashboard-box">
  <h3>Review</h3>
  <p>Provide and view reviews of your services.</p>
</div>

<div className="dashboard-box">
  <h3>Status of Work</h3>
  <p>Track the progress of sowing, growing, and harvesting.</p>
</div>

</div> */}
      </div>

      <div className="main-content form-background">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-pic">
            <img src={profileData.profilePic} alt="Profile Pic" />
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

        {/* Form for further details */}
        <div className="form-container">
          <h2>Fill Further Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="areaOfLand">Area of land (in decimals)</label>
              <input
                className="text-black"
                type="number"
                id="areaOfLand"
                name="areaOfLand"
                value={profileData.areaOfLand}
                onChange={handleChange}
                placeholder="Enter area of land in decimals..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                className="text-black"
                type="text"
                id="location"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                placeholder="Enter your location..."
              />
            </div>

            <div className="form-group inline-group">
              <div className="form-group">
                <label htmlFor="startingMonth">Start Month</label>
                <select
                  className="text-black"
                  id="startingMonth"
                  name="startingMonth"
                  value={profileData.startingMonth}
                  onChange={handleChange}
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
                  value={profileData.endingMonth}
                  onChange={handleChange}
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
              <label htmlFor="description">Description</label>
              <textarea
                className="text-black"
                id="description"
                name="description"
                value={profileData.description}
                onChange={handleChange}
                placeholder="Enter a description..."
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
