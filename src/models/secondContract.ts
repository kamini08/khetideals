
import mongoose, { Schema } from 'mongoose';


// Define the schema
const contractSchema: Schema = new Schema({
  
  contract2Id: {
    type: String,
    required: true,
    unique: true,
  },
  contract2Url: {
    type: String,
  },
  isCropperSigned: {
    type: Boolean,
    default: false,
  },
  isLandLordSigned: {
    type: Boolean,
    default: false,
  },
  contract2Status: {
    type: String,
    enum: ["pending", "signed", "completed"],
    default: "pending",
  },
  landholder: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    landholderId: {
      type: String,
    }

  },
  sharecropper: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    sharecropperId: {type: String,} 
  },
  landDetails: {
    location: { type: String, required: true },
    areaOfLand: { type: Number, required: true },
    soilType: { type: String, required: true },
    cropToGrow: { type: String, required: true },
  },
  cropCycle: {
    startingMonth: { type: String, required: true },
    endingMonth: { type: String, required: true },
  },
  financialDetails: {
    pricePerDecimal: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    paymentTerms: { type: String, required: true },
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

const ContractModel = mongoose.models.Contract2 || mongoose.model('Contract2', contractSchema);


export default ContractModel;
