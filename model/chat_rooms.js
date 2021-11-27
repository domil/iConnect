const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatRoomSchema = new Schema({
  roomName: String,
  roomDescription: String,
  roomImage: Buffer,
  roomimageFileName: String,
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const ChatRooms = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRooms;
