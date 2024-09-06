"use client";

import React, { useState, useEffect } from "react";
import "../components/buyer.css";

const BuyerProfile = () => {
  const [formData, setFormData] = useState({
    category: "",
    paymentTerms: "Cash",
    location: "",
    address: "",
    startingMonth: "january",
    endingMonth: "january",

    description: "",
  });

  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch("/api/farmerProfile");
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        setFormData({
          category: data.category || "",
          paymentTerms: data.paymentTerms || "Cash",
          location: data.location || "",
          address: data.address || "",
          startingMonth: data.startingMonth || "january",
          endingMonth: data.endingMonth || "january",

          description: data.description || "",
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, []);

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
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-center">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="form-container">
      <div className="edit">
        <h2>Fill further details</h2>
        <h3>Edit</h3>
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
          <label htmlFor="location">Location</label>
          <input
            className="text-black"
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
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
          <label htmlFor="description">Description</label>
          <textarea
            className="text-black"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BuyerProfile;
