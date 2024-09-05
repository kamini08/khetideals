//Schema for further profile set up farmer which can be updated whenever wanted

const mongoose = require("mongoose");

const farmerMarketPlaceSubSchema = new mongoose.Schema({
  mainId: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
    // Example categories
  },
  paymentTerms: {
    type: [String],
    required: true,
    enum: ["Cash", "Credit", "Installments"], // Example payment terms
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  startingMonth: {
    type: String,
    required: true,
  },
  endingMonth: {
    type: String,
    required: true,
  },
  description: { type: String },
});

module.exports =
  mongoose.models.FarmerMarketPlaceSub ||
  mongoose.model("FarmerMarketPlaceSub", farmerMarketPlaceSubSchema);
