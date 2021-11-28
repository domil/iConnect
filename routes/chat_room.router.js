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

roomsRouter.get('/messages/:roomid', chatRoomController.getMessages);
roomsRouter.post('/message', chatRoomController.writeMessage);
roomsRouter.get('/joinedrooms/:teacherid', chatRoomController.getJoinedRooms);
roomsRouter.post('/joinroom', chatRoomController.joinRoom);
roomsRouter.delete('/leaveroom', chatRoomController.leaveRoom);
roomsRouter.get('/all/:teacherid', chatRoomController.getAllRooms);

module.exports = roomsRouter;
