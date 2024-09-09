import mongoose, { Schema, HookNextFunction } from 'mongoose';

// Define the schema
const contractSchema: Schema = new Schema({
  contractId: { type: String, required: true, unique: true },
  landholder: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    landholderId: {
      type: Schema.Types.ObjectId,
      ref: 'Landholder',
      required: true
    }
  },
  sharecropper: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    sharecropperId: {
      type: Schema.Types.ObjectId,
      ref: 'Sharecropper',
      required: true
    }
  },
  landDetails: {
    location: { type: String, required: true },
    areaOfLand: { type: Number, required: true },
    soilType: { type: String, required: true },
    cropToGrow: { type: String, required: true }
  },
  cropCycle: {
    startingMonth: { type: String, required: true },
    endingMonth: { type: String, required: true }
  },
  financialDetails: {
    pricePerDecimal: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    paymentTerms: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['Pending', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the `updatedAt` field on save
contractSchema.pre('save', function (next: HookNextFunction) {
  (this as any).updatedAt = new Date();
  next();
});

const ContractModel = mongoose.models.Contract || mongoose.model('Contract', contractSchema);

export default ContractModel;
