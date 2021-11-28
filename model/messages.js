const mongoose = require("mongoose");

const { Schema } = mongoose;

const Messages = new Schema({
  room: { type: Schema.Types.ObjectId, ref: "ChatRoom" },
  message: String,
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const Message = mongoose.model("Message", Messages);

module.exports = Message;
