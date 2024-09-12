
import mongoose from "mongoose"

const buyerSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique: true},
    phoneNumber: { type: String },
    address: { type: String,required:true},
    password:{type:String,required:true},
    location: { type: String }, 
    description: { type: String },  // Brief description of the buyer or their requirements 
    category: { type: String, required: true },  // E.g., Vegetables, Fruits, Grains, etc.
    postedAt: { type: Date, default: Date.now }, //// When the buyer was listed to show the experience
});
const buyerModel = mongoose.models.buyer || mongoose.model("buyer",buyerSchema);
export default buyerModel;