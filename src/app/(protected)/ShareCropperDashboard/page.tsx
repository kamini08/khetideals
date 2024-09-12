"use client";
import React, { useState, useEffect, FormEvent } from "react";
import SDash from "../components/SDash";
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

const ShareCropperDashboard: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
  const [workStatus, setWorkStatus] = useState<WorkStatus[]>([
    { buyerName: "Buyer 1", area: 5, location: "Location 1", statusOfWork: "Sowing" }, // Default value
    { buyerName: "Buyer 2", area: 10, location: "Location 2", statusOfWork: "Sowing" },
  ]);

  useEffect(() => {
    // Fetch landholder details from the backend
    fetch("/api/ShareCropperDashboard")
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
        <SDash />
      </div>

      <div className="main-content">
        {/* Search Section */}
        <div className="section" id="search-section">
          <h1 className="search-profile text-lg">Search LandLord's Plot</h1>

          <form onSubmit={searchBuyers}>
            <div className="form-group">
              <label htmlFor="CropType">Crop Type</label>
              <input type="text" id="CropType" name="CropType" placeholder="Enter the Crop..." />
            </div>
            <div className="form-group inline-group">
              <div className="form-group">
                <label htmlFor="landarea">Area of land</label>
                <input type="number" id="landarea" name="landarea" placeholder="Enter area of land in decimals..." />
              </div>
              <div className="form-group">
                <label htmlFor="pricePerDecimal">Price per decimal</label>
                <input type="number" id="pricePerDecimal" name="pricePerDecimal" placeholder="Enter price per Decimals..." />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="location">City</label>
              <input type="text" id="location" name="location" placeholder="Enter your city..." />
            </div>
            <div className="text-center">
            <button id="searchBtn" type="submit">
              Search
            </button></div>
          </form>
        </div>

        {/* Land Details Section */}
        <div className="plot-section" id="land-details-section">
          <h2 className="text-center text-xl"><strong>Landlord's Plots</strong></h2>
          <div className="plot-container">
            {landDetails.length > 0 ? (
              landDetails.map((land, index) => (
                <div className="plot-card" key={index}>
                  <div className="plot-card-header ">
                    <img
                      src="https://t4.ftcdn.net/jpg/02/75/94/93/240_F_275949388_k1rVe1KTRLzPeQAfbxdTXvcTLbiHB95l.jpg"
                      alt="Icon"
                    />
                  </div>
                  <div className="plot-card-body">
                    <p className="Name">Name: Raju Kumar</p>
                    <p className="plot-card-description">Email: raju@gmail.com</p>
                    <p className="plot-card-description">Area of Land: {land.areaOfLand}</p>
                    <p className="plot-card-description">Location: {land.location}</p>
                    <p className="plot-card-description">Crop To Grow: {land.cropToGrow}</p>
                    <p className="plot-card-description">Address: {land.address}</p>
                    <p className="plot-card-description">Soil Type: {land.soilType}</p>
                    <p className="plot-card-description">Start Month: {land.startingMonth}</p>
                    <p className="plot-card-description">End Month: {land.endingMonth}</p>
                    <p className="plot-card-description">Price per Decimal: {land.pricePerDecimal}</p>
                    <button className="but text-xs" type="submit">
                      Chat with the landholder
                    </button>
                    <button className="but text-xs" type="submit">
                      Make a Proposal for contract
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No land details available.</p>
            )}
          </div>
        </div>

        {/* Status of Work Section */}
        <div className="section text-center mb-4 " id="work-status-section">
          <h2 className='mb-4'text-xl><strong>Status of Work</strong></h2>
          <div className="contracts-container">
            {workStatus.map((status, index) => (
              <div className="contract-card" key={index}>
                <h3>Landlord: {status.buyerName}</h3>
                <p>Area: {status.area} decimals</p>
                <p>Location: {status.location}</p>
                <p>Status Of Work:</p>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name={`status-${index}`}
                      value="Sowing"
                      checked={status.statusOfWork === "Sowing"}
                      onChange={() => handleStatusChange(index, "Sowing")}
                    />
                    Sowing
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${index}`}
                      value="Growing"
                      checked={status.statusOfWork === "Growing"}
                      onChange={() => handleStatusChange(index, "Growing")}
                    />
                    Growing
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${index}`}
                      value="Harvested"
                      checked={status.statusOfWork === "Harvested"}
                      onChange={() => handleStatusChange(index, "Harvested")}
                    />
                    Harvested
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCropperDashboard;
