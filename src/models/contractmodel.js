import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  contractId: {
    type: String,
    required: true,
    unique: true,
  },
  contractUrl: {
    type: String,
  },
  isFarmerSigned: {
    type: Boolean,
    default: false,
  },
  isBuyerSigned: {
    type: Boolean,
    default: false,
  },
  contractStatus: {
    type: String,
    enum: ["pending", "signed", "completed"],
    default: "pending",
  },
  buyer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String},
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    Account: { type: Number, required: true },
    ifsc: { type: String, required: true },
  },
  seller: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    Account: { type: Number, required: true },
    ifsc: { type: String, required: true },
  },
  product: {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  terms: {
    paymentTerms: { type: String }, // E.g., "50% upfront, 50% on delivery"
    deliveryDate: { type: Date, required: true },
    deliveryLocation: { type: String, required: true },
    returnPolicy: { type: String }, // E.g., "No returns after 30 days"
    additionalTerms: { type: String }, // Any other terms agreed upon
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field on save
contractSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const ContractModel =
  mongoose.models.Contract || mongoose.model("Contract", contractSchema);

export default ContractModel;
