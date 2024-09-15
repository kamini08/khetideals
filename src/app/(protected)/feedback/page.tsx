"use client";
import React, { useState } from "react";
import "../components/feedback.css"; // Ensure this path is correct for your CSS
import { toast } from "react-toastify";


const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    farmerEmail: '',
    rating: '',
    timeliness: '',
    cropQuality: '',
    communication: '',
    landlordName: '',
    landlordEmail: '',
    feedback: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =async (e:any) => {
    e.preventDefault();
  
      try {
        const response = await fetch("/api/feedback", {
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
        console.log("Form submitted successfully:", data);
        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Optionally, reset form after successful submission
        setFormData({
          ...formData,
          farmerName: '',
          farmerEmail: '',
          rating: '',
          timeliness: '',
          cropQuality: '',
          communication: '',
          landlordName: '',
          landlordEmail: '',
          feedback: '',
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
    <div className="container animated fadeInUp">
      <h1 className="text-4xl"><strong>Sharecropper Feedback Form</strong></h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section className="personal-info animated fadeInUp">
          <h2 className="text-2xl">Personal Information</h2>
          <div className="input-group text-center">
            <label htmlFor="farmerName">Name of Sharecropper:</label>
            <input
              type="text"
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              required
              placeholder='Enter ShareCropper Name'
            />
          </div>
          <div className="input-group text-center">
            <label htmlFor="farmerEmail">E-mail of Sharecropper:</label>
            <input
              type="email"
              id="farmerEmail"
              name="farmerEmail"
              value={formData.farmerEmail}
              onChange={handleChange}
              required
              placeholder='Enter Email of Sharecropper'
            />
          </div>
        </section>
        <div className="input-group animated fadeInUp">
          <label>Work Performance:</label>
          <div className="radio-options">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num}>
                <input
                  type="radio"
                  name="rating"
                  value={num}
                  checked={formData.rating === num.toString()}
                  onChange={handleChange}
                  required
                  placeholder='Rate Work Performance'
                />{' '}
                {num}
              </label>
            ))}
          </div>
        </div>

        {/* Timeliness Rating */}
        <div className="input-group animated fadeInUp">
          <label>Timeliness:</label>
          <div className="radio-options">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num}>
                <input
                  type="radio"
                  name="timeliness"
                  value={num}
                  checked={formData.timeliness === num.toString()}
                  onChange={handleChange}
                  required
                  placeholder='Rate Punctuality and Responsivity of Sharecropper'
                />{' '}
                {num}
              </label>
            ))}
          </div>
        </div>

        {/* Crop Quality Rating */}
        <div className="input-group animated fadeInUp">
          <label>Crop Quality:</label>
          <div className="radio-options">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num}>
                <input
                  type="radio"
                  name="cropQuality"
                  value={num}
                  checked={formData.cropQuality === num.toString()}
                  onChange={handleChange}
                  required
                
                  placeholder='Rate Crop Quality Grown'
                />{' '}
                {num}
              </label>
            ))}
          </div>
        </div>

        {/* Communication Skills Rating */}
        <div className="input-group animated fadeInUp">
          <label>Communication Skills:</label>
          <div className="radio-options">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num}>
                <input
                  type="radio"
                  name="communication"
                  value={num}
                  checked={formData.communication === num.toString()}
                  onChange={handleChange}
                  required
               
                  placeholder='Rate Communication Skill of Sharecropper'
                />{' '}
                {num}
              </label>
            ))}
          </div>
        </div>

        {/* Landlord Information */}
        <section className="personal-info animated fadeInUp">
          <h2>Landlord Information</h2>
          <div className="input-group text-center">
            <label htmlFor="landlordName">Name of Landlord:</label>
            <input
              type="text"
              id="landlordName"
              name="landlordName"
              value={formData.landlordName}
              onChange={handleChange}
              required
              placeholder='Enter LandLord Name'
            />
          </div>
          <div className="input-group">
            <label htmlFor="landlordEmail">E-mail of Landlord:</label>
            <input
              type="email"
              id="landlordEmail"
              name="landlordEmail"
              value={formData.landlordEmail}
              onChange={handleChange}
              required
              placeholder='Enter LandLord Email'
            />
          </div>
        </section>

        {/* Feedback */}
        <div className="input-group animated fadeInUp text-center">
          <label htmlFor="feedback">Suggestions for improvement:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            placeholder='Fill some Suggestions'
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn animated bounceIn text-center">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
