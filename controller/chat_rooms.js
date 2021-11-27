const { ChatRoom } = require('../model');

const { imageStore } = require('../lib');
const multer = require('multer');

const uploadImg = multer({
    storage: imageStore,
    limits: {
        fileSize: 1000000, // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
}).single("image");

const getRooms = async (req, res) => {
    try {
        const query = {status:'active'};
        let rooms = await ChatRoom.find(query);
        res.status(200).send({ success: true, data: rooms });
    } catch (err) {
        console.log('getRooms:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
};

const createRoom = async (req, res) => {
    try {
        console.log('createRoom:: ', req.body);
        const chatRoom = new ChatRoom(
            {
                roomName: req.body.roomName,
                roomDescription: req.body.roomDescription,
                roomimageFileName: req.file ? req.file.path : ''
            }
        );
        var saved = await chatRoom.save();
        return res.status(200).send({ success: true, message: "Room Created! " });
    } catch (err) {
        console.log('createRoom:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
};

const blockRoom = async (req, res) => {
    try {
        console.log('blockRoom:: ', req.body);
        const roomId  = req.body.roomId;
        //validate if user is admin
        const room = await ChatRoom.find({ _id: roomId });
        if (!room || !room.length) {
            res.status(401).send({ success: true, message: "Room Not Found!" });
        }
        await ChatRoom.updateOne({ _id: roomId }, { status: 'inactive' });
        res.status(200).send({ success: true, message: "Room Successfully deactivated!" });
    } catch (err) {
        console.log('blockRoom:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
}

module.exports = {
    getRooms,
    createRoom,
    uploadImg,
    blockRoom
}