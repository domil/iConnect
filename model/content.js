const mongoose = require("mongoose");

const { Schema } = mongoose;

const contentSchema = new Schema({
  classid: Number,
  subjectid: Number,
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  unitid: Number,
  type: {
    type: String,
    enum: ["image", "text"],
    default: "text",
  },
  content: String,
  image: Buffer,
  imageFileName: String,
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["allow", "blocked"],
    default: "allow",
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
