import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
    contractId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    buyer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        Account: { type: Number, required: true },
    },
    seller: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        Account: { type: Number, required: true },
    },
    product: {
        name: { type: String, required: true },
        description: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    terms: {
        paymentTerms: { type: String, required: true }, // E.g., "50% upfront, 50% on delivery"
        deliveryDate: { type: Date, required: true },
        deliveryMethod: { type: String, required: true }, // E.g., "Shipping", "Pickup"
        returnPolicy: { type: String }, // E.g., "No returns after 30 days"
        additionalTerms: { type: String }, // Any other terms agreed upon
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled','ongoing'],
        default: 'Pending',
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
contractSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const ContractModel = mongoose.models.Contract || mongoose.model('Contract', contractSchema);

export default ContractModel;