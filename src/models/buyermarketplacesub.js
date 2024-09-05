//Schema for further profile set up buyer which can be updated whenever wanted
const mongoose = require("mongoose");

const buyerMarketPlaceSubSchema = new mongoose.Schema({
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

  minimumQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  description: { type: String }, // Brief description of the buyer or their requirements
});

module.exports =
  mongoose.models.buyerMarketPlaceSub ||
  mongoose.model("buyerMarketPlaceSub", buyerMarketPlaceSubSchema);
