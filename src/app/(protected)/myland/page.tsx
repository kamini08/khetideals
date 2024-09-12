"use client";
import React, { useState, useEffect, FormEvent } from "react";
import LDash from '../components/LDash';
import "@/components/styles/p2a.css";
import "@/components/styles/p2b.css";
import "@/components/styles/p2c.css";

// Define types for Buyers, Land Details, and Work Status
interface Buyer {
  name: string;
  location: string;
  cropType: string;
  area: number;
  pricePerDecimal: number;
  startMonth: string;
  endMonth: string;
}

interface LandDetail {
  mainId: string;
  areaOfLand: number;
  location: string;
  address: string;
  cropToGrow: string;
  soilType: string;
  startingMonth: string;
  endingMonth: string;
  pricePerDecimal: number;
}

interface WorkStatus {
  buyerName: string;
  area: number;
  location: string;
  statusOfWork: string;
}

const  LandlordProfile: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
  const [workStatus, setWorkStatus] = useState<WorkStatus[]>([
    { buyerName: "Buyer 1", area: 5, location: "Location 1", statusOfWork: "Sowing" }, // Default value
    { buyerName: "Buyer 2", area: 10, location: "Location 2", statusOfWork: "Sowing" },
  ]);

  useEffect(() => {
    // Fetch landholder details from the backend
    fetch("/api/myland")
      .then((response) => response.json())
      .then((data) => setLandDetails(data))
      .catch((error) => console.error("Error fetching landholder data:", error));
  }, []);

  // Placeholder for handling search (implement this later)
  const searchBuyers = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search buyers triggered");
  };

  // Handle status change
  const handleStatusChange = (index: number, status: string) => {
    const updatedStatus = [...workStatus];
    updatedStatus[index].statusOfWork = status;
    setWorkStatus(updatedStatus);
  };

  
 
  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="farmer-profile">ShareCropper Profile</h2>
       <LDash />
      </div>
      <div className="main-content">
        <div className="section" id="search-section">
          <h1 className="search-profile">My Lands</h1>

          <div className="plot-section" id="land-details-section">
            <div className="plot-container">
              {landDetails.length > 0 ? (
                landDetails.map((land, index) => (
                  <div className="plot-card" key={index}>
                    <div className="plot-card-header">
                      <img
                        src="https://t4.ftcdn.net/jpg/02/75/94/93/240_F_275949388_k1rVe1KTRLzPeQAfbxdTXvcTLbiHB95l.jpg"
                        alt="Icon"
                      />
                    </div>
                    <div className="plot-card-body">
                      <p className="plot-card-description">Area of Land: {land.areaOfLand}</p>
                      <p className="plot-card-description">Location: {land.location}</p>
                      <p className="plot-card-description">Crop Type: {land.cropToGrow}</p>
                      <p className="plot-card-description">Address: {land.address}</p>
                      <p className="plot-card-description">Soil Type: {land.soilType}</p>
                      <p className="plot-card-description">Start Month: {land.startingMonth}</p>
                      <p className="plot-card-description">End Month: {land.endingMonth}</p>
                      <p className="plot-card-description">Price per Decimal: {land.pricePerDecimal}</p>
                      <button  className="but"type="submit">Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No land details available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordProfile;