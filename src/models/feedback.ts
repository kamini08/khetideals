const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  landholderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Landholder', 
    required: true 
  }, // Reference to the landholder
  sharecropperId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sharecropper', 
    required: true 
  }, // Reference to the sharecropper
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }, // Rating out of 5
  feedback: { 
    type: String, 
    required: true 
  }, // Written feedback from the landholder
  timeliness: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }, // Rating of how timely the sharecropper was
  cropQuality: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }, // Rating of the quality of the crops
  communication: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }, // Rating of the communication skills of the sharecropper
});

const FeedbackModel = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default FeedbackModel;
