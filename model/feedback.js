const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  classid: Number,
  subjectid: Number,
  teacherid: Number,
  unitid: Number,
  team:  {
    type: String,
    enum: ["Content", "Product"],
    default: "Content",
  },
  feedbackText: String,
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Resolved"],
    default: "Pending",
  },
  comments: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
