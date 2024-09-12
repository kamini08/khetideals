import React, { useState } from 'react';
import '../components/feedback.css'; // Ensure this path is correct for your CSS

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    farmerEmail: '',
    timeliness: '',
    cropQuality: '',
    communication: '',
    landlordName: '',
    landlordEmail: '',
    feedback: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert('Feedback submitted successfully!');
    // You can handle form submission here (e.g., send data to server)
  };

  return (
    <div className="container animated fadeInUp">
      <h1>Farmer Feedback Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section className="personal-info animated fadeInUp">
          <h2>Personal Information</h2>
          <div className="input-group">
            <label htmlFor="farmerName">Name of Farmer:</label>
            <input
              type="text"
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="farmerEmail">E-mail of Farmer:</label>
            <input
              type="email"
              id="farmerEmail"
              name="farmerEmail"
              value={formData.farmerEmail}
              onChange={handleChange}
              required
            />
          </div>
        </section>

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
                />{' '}
                {num}
              </label>
            ))}
          </div>
        </div>

        {/* Landlord Information */}
        <section className="personal-info animated fadeInUp">
          <h2>Landlord Information</h2>
          <div className="input-group">
            <label htmlFor="landlordName">Name of Landlord:</label>
            <input
              type="text"
              id="landlordName"
              name="landlordName"
              value={formData.landlordName}
              onChange={handleChange}
              required
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
            />
          </div>
        </section>

        {/* Feedback */}
        <div className="input-group animated fadeInUp">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn animated bounceIn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;