"use client";
import React, { useState, useEffect, FormEvent } from "react";
import "@/components/styles/p2a.css";
import "@/components/styles/p2b.css";
import "@/components/styles/p2c.css";
import LDash from "../components/LDash";
import { toast } from "react-toastify";
import Link from "next/link";

interface UserDetails {
  id: string;
  name: string | null;
  email: string | null;
  // Add other fields as needed
}
interface Sharecropper {
  mainId: string;
  areaOfLand: number;
  location: string;
  startingMonth: string;
  endingMonth: string;
  description: string;
  userDetails?: UserDetails | null;
}
interface WorkStatus {
  buyerName: string;
  area: number;
  location: string;
  statusOfWork: string;
}

const LandHolderDashboard: React.FC = () => {
  const [sharecroppers, setSharecroppers] = useState<Sharecropper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    CropType: "",
    area: "",
    location: "",
  });

  const [workStatus, setWorkStatus] = useState<WorkStatus[]>([
    {
      buyerName: "Buyer 1",
      area: 5,
      location: "Location 1",
      statusOfWork: "Sowing",
    }, // Default value
    {
      buyerName: "Buyer 2",
      area: 10,
      location: "Location 2",
      statusOfWork: "Sowing",
    },
  ]);

  useEffect(() => {
    fetch("/api/landHolderDashboard")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          toast.warn("No sharecroppers found for the specified criteria", {
            position: "top-right",
          });
        }
        setSharecroppers(data);
        console.log(data);
        setLoading(false); // Add this to stop showing the loading message
      })
      .catch((error) => {
        console.error("Error fetching sharecroppers:", error);
        setLoading(false); // Even in case of an error, stop showing the loading message
      });
  }, [setSharecroppers]);
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

  const searchBuyers = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // post function
    try {
      const response = await fetch("/api/landHolderDashboard", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setSharecroppers(data);

      console.log("Form submitted successfully:", data[0]);

      // Optionally, reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log("Search buyers triggered");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle status change
  const handleStatusChange = (index: number, status: string) => {
    const updatedStatus = [...workStatus];
    updatedStatus[index].statusOfWork = status;
    setWorkStatus(updatedStatus);
    console.log(updatedStatus);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="farmer-profile ">
          <strong>Landlord Profile</strong>
        </h2>
        <LDash />
      </div>

      <div className="main-content">
        <div className="section" id="search-section">
          <h1 className="search-profile">
            <strong>Search Sharecroppers</strong>
          </h1>

          <form onSubmit={searchBuyers}>
            {/* <div className="form-group text-center">
              <label htmlFor="CropType">Crop Type</label>
              <input
                type="text"
                id="CropType"
                name="CropType"
                onChange={handleChange}
                placeholder="Enter the Crop..."
                value={formData.CropType}
              />
            </div> */}

            <div className="form-group text-center">
              <label htmlFor="landarea">Area of land</label>
              <input
                type="number"
                id="area"
                name="area"
                onChange={handleChange}
                placeholder="Enter area of land in decimals..."
                value={formData.area}
              />
            </div>

            <div className="form-group text-center">
              <label htmlFor="location">City</label>
              <input
                type="text"
                id="location"
                name="location"
                onChange={handleChange}
                placeholder="Enter your city..."
                value={formData.location}
              />
            </div>
            <div className="text-center">
              <button id="searchBtn" type="submit">
                Search
              </button>
            </div>
          </form>

          <div className="plot-section" id="sharecropper-details-section">
            {/* <h2>Sharecropper's Details</h2> */}
            <div className="plot-container">
              {sharecroppers.length > 0 ? (
                sharecroppers.map((sharecropper, index) => (
                  <div className="plot-card" key={index}>
                    <div className="plot-card-header">
                      <img
                        src="https://t4.ftcdn.net/jpg/02/75/94/93/240_F_275949388_k1rVe1KTRLzPeQAfbxdTXvcTLbiHB95l.jpg"
                        alt="Icon"
                      />
                    </div>
                    <div className="plot-card-body">
                      <p className="Name">
                        Name: {sharecropper.userDetails?.name}
                      </p>

                      <p className="plot-card-description">
                        Email: {sharecropper.userDetails?.email}
                      </p>
                      <p className="plot-card-description">
                        Location: {sharecropper.location}
                      </p>
                      <p className="plot-card-description">
                        Area: {sharecropper.areaOfLand}
                      </p>
                      <p className="plot-card-description">
                        Start Month: {sharecropper.startingMonth}
                      </p>
                      <p className="plot-card-description">
                        End Month: {sharecropper.endingMonth}
                      </p>
                      <p className="plot-card-description">
                        Description: {sharecropper.description}
                      </p>
                      <Link href={`/chat/${sharecropper.mainId}`}>
                        <button className="but" type="button">
                          Chat Now
                        </button>
                      </Link>
                      <Link href="/proposalForm2">
                        <button className="but" type="button">
                          Make Proposal
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No sharecropper details available.</p>
              )}
            </div>
          </div>

          {/* Status of Work Section */}
          <div className="section text-center mb-4 " id="work-status-section">
            <h2 className="mb-4" text-xl>
              <strong>Status of Work</strong>
            </h2>
            <div className="contracts-container">
              {workStatus.map((status, index) => (
                <div className="contract-card" key={index}>
                  <h3>ShareCropper: {status.buyerName}</h3>
                  <p>Area: {status.area} decimals</p>
                  <p>Location: {status.location}</p>
                  <p>Status Of Work: {status.statusOfWork}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandHolderDashboard;
