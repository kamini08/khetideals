"use client";
import React, { useState, useEffect } from 'react';
import "@/components/styles/p2a.css";
import "@/components/styles/p2b.css";
import "@/components/styles/p2c.css";
import LDash from '../components/LDash';

interface Sharecropper {
  mainId: string;
  areaOfLand: number;
  location: string;
  startingMonth: string;
  endingMonth: string;
  description: string;
}

const LandHolderDashboard: React.FC = () => {
  const [sharecroppers, setSharecroppers] = useState<Sharecropper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    CropType: '',
    landarea: '',
    location: ''
  });

  useEffect(() => {
    fetch('/api/landHolderDashboard')
      .then((response) => response.json())
      .then((data) => {
        setSharecroppers(data);
        setLoading(false); // Add this to stop showing the loading message
      })
      .catch((error) => {
        console.error('Error fetching sharecroppers:', error);
        setLoading(false); // Even in case of an error, stop showing the loading message
      });
  }, []);

  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="container">
        <div className="sidebar">
          <h2 className="farmer-profile "><strong>Landlord Profile</strong></h2>
          <LDash />
        </div>

        <div className="main-content">
          <div className="section" id="search-section">
            <h1 className="search-profile"><strong>Search Sharecroppers</strong></h1>

            <form >
              <div className="form-group text-center">
                <label htmlFor="CropType">Crop Type</label>
                <input
                  type="text"
                  id="CropType"
                  name="CropType"
                  placeholder="Enter the Crop..."
                  value={formData.CropType}
                />
              </div>

              <div className="form-group text-center">
                <label htmlFor="landarea">Area of land</label>
                <input
                  type="number"
                  id="landarea"
                  name="landarea"
                  placeholder="Enter area of land in decimals..."
                  value={formData.landarea}
                 
                />
              </div>

              <div className="form-group text-center">
                <label htmlFor="location">City</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter your city..."
                  value={formData.location}
                
                />
              </div>
              <div className="text-center text-center">
                <button id="searchBtn" type="submit">
                  Search
                </button>
              </div>
            </form>

            <div className="plot-section" id="sharecropper-details-section">
              <h2>Sharecropper's Details</h2>
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
                        <p className="Name">Name</p>
                        <p className="plot-card-description">Location: {sharecropper.location}</p>
                        <p className="plot-card-description">Start Month: {sharecropper.startingMonth}</p>
                        <p className="plot-card-description">End Month: {sharecropper.endingMonth}</p>
                        <p className="plot-card-description">Description: {sharecropper.description}</p>
                        <button className="but" type="button">Chat Now</button>
                        <button className="but" type="button">Make Proposal</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No sharecropper details available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}
export default LandHolderDashboard;
