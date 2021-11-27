const express = require("express");
const { chatRoomController } = require("../controller");
const { roomsValidation, deactivateRooms } = require("../middleware/validation");

const roomsRouter = express.Router();

roomsRouter.get("/", chatRoomController.getRooms);

roomsRouter.post(
  "/",
  chatRoomController.uploadImg,
  roomsValidation,
  chatRoomController.createRoom
);

roomsRouter.put('/deactivate', deactivateRooms, chatRoomController.blockRoom);

module.exports = roomsRouter;
