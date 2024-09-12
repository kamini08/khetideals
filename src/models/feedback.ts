import mongoose from "mongoose"

const FeedbackSchema = new mongoose.Schema({
  mainId:{
type: String,
required: true
  },
  farmerName: {
    type: String,
    required: true,
  },
  farmerEmail: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Assuming rating between 1 and 5
  },
  timeliness: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Assuming rating between 1 and 5
  },
  cropQuality: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  communication: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  landlordName: {
    type: String,
    required: true,
  },
  landlordEmail: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: false,
  },
});

const Feedback= mongoose.models.Feedback|| mongoose.model('Feedback', FeedbackSchema);
export default Feedback;