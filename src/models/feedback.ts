import mongoose from "mongoose"

const FeedbackSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
  },
  farmerEmail: {
    type: String,
    required: true,
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

module.exports = mongoose.models.Feedback|| mongoose.model('Feedback', FeedbackSchema);
