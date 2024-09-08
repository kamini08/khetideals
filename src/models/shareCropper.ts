const mongoose = require("mongoose");

const sharecropperSchema = new mongoose.Schema({
  mainId:{ type :String,required:true},
  areaOfLand: { type: Number, required: true }, // Size in decimals
  location: { type: String, required: true },   // Location of the land
  startingMonth: { type: String, required: true }, // When the crop cycle begins
  endingMonth: { type: String, required: true },  
  description: { type: String }, // When the crop cycle ends  
});

const SharecropperModel = mongoose.models.Sharecropper || mongoose.model('Sharecropper', sharecropperSchema);

export default SharecropperModel;
