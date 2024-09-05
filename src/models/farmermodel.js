//Schema for login and registeration of farmer
import mongoose from "mongoose"

const farmerSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique: true},
    phoneNumber: { type: String },
    password:{type:String,required:true},
    location: { type: String }, 
});
const data= mongoose.models.farmers || mongoose.model("farmers",farmerSchema);
export default data;