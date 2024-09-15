"use client";
// import "../components/buyer.css";
import "../components/eProfile.css";

import React, { useState, useEffect } from "react";
import SDash from "../components/SDash";
import Link from "next/link";

const ShareCropperProfile: React.FC = () => {
  // State to hold form data
  const [profileData, setProfileData] = useState({
    profilePic:
      "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?size=626&ext=jpg&ga=GA1.1.1974988790.1724696296&semt=ais_hybrid",
    username: "John Doe",
    email: "john.doe@example.com",
    areaOfLand: "",
    location: "",
    startingMonth: "january", // Default to January
    endingMonth: "january", // Default to January
    description: "",
  });

  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]); // Initialize as empty arrays
  const [workStatus, setWorkStatus] = useState<any[]>([]);

  useEffect(() => {
    // Fetch profile data
    const fetchDocument = async () => {
      try {
        const response = await fetch("/api/shareCropperProfile");
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        setProfileData({
          profilePic: data.profilePic || profileData.profilePic,
          username: data.name || profileData.username,
          email: data.email || profileData.email,
          areaOfLand: data.document.areaOfLand || "",
          location: data.document.location || "",
          startingMonth: data.document.startingMonth || "january",
          endingMonth: data.document.endingMonth || "january",
          description: data.document.description || "",
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch reviews data
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews"); // Adjust API endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
       
        setReviews(data.document); 
        console.log("Fetched reviews:", JSON.stringify(data.document));// Assuming the API returns an array of reviews
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchDocument();
    fetchReviews();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="farmer-profile">Sharecropper Profile</h2>
        <SDash />
      </div>

      <div className="main-content form-background">
        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-picc">
            <img src={profileData.profilePic} alt="Profile Pic" />
          </div>

          <div className="profile-detailss">
            <h2>{profileData.username}</h2>
            <p>{profileData.description}</p>
            <h3>{profileData.email}</h3>
          </div>
        </div>

        {/* Display other fetched details */}
        <div className="details-group">
          <p>
            <strong>Area of Land:</strong> {profileData.areaOfLand}
          </p>
          <p>
            <strong>City:</strong> {profileData.location}
          </p>
          <p>
            <strong>Start Month:</strong> {profileData.startingMonth}
          </p>
          <p>
            <strong>End Month:</strong> {profileData.endingMonth}
          </p>
        </div>

        <Link href="/updateShareCropperProfile">
          <div className="form-group text-center">
            <button type="submit" className="text-white">Edit</button>
          </div>
        </Link>

        {/* Reviews Section */}
        <div className="contracts-section" id="reviews-section">
          <h2>Reviews</h2>
          <div className="contracts-container">
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div className="contract-card" key={index}>
                  <h3>Landlord: {review.landlordName}</h3>
                  <p>Work Performance: {review.rating}/5</p>
                  <p>Punctuality: {review.timeliness}/5</p>
                  <p>Communication Skills: {review.communicationSkills}/5</p>
                  <p>Crop Quality: {review.cropQuality}/5</p>
                  <p>Feedback: {review.feedback}</p>
                </div>
              ))
            ) : (
              <p>No reviews found.</p>
            )}
          </div>
        </div>

        {/* Status of Work Section */}
        <div className="contracts-section" id="work-status-section">
          <h2>Status of Work</h2>
          <div className="contracts-container">
            {workStatus.length > 0 ? (
              workStatus.map((status, index) => (
                <div className="contract-card" key={index}>
                  <h3>Landlord: {status.landlordName}</h3>
                  <p>Area of Plat: {status.areaOfPlat}</p>
                  <p>Status of Work: {status.statusOfWork}</p>
                </div>
              ))
            ) : (
              <p>No status of work found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCropperProfile;
