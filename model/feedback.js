const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  classid: Number,
  subjectid: Number,
  teacher: {type:Schema.Types.ObjectId, ref: 'User'},
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
  comments: {type: String, default:''},
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
