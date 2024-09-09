import mongoose from 'mongoose';

const landholderSchema = new mongoose.Schema({
  mainId:{ type :String,required:true},
    areaOfLand: { type: Number, required: true }, // Size in decimals
  location: { type: String, required: true }, // Location of the land
  adress:{type: String, required: true},
  cropToGrow: { type: String, required: true }, // Crop type
  soilType: { type: String, required: true }, // Soil type on the land
  startingMonth: { type: String, required: true }, // When the crop cycle begins
  endingMonth: { type: String, required: true }, // When the crop cycle ends
  pricePerDecimal: { type: Number, required: true }, 
 
});

const LandholderModel = mongoose.models.Landholder || mongoose.model('Landholder', landholderSchema);

export default LandholderModel; 