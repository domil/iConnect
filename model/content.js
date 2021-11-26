const mongoose = require("mongoose");

const { Schema } = mongoose;

const contentSchema = new Schema({
  classid: Number,
  subjectid: Number,
  teacherid: Number,
  unitid: Number,
  type:  {
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
    enum: ["Open", "Blocked"],
    default: "Open",
  }
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
