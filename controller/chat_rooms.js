const { ChatRoom, Message, UserChat } = require('../model');

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

const getJoinedRooms = async (req,res) => {
    try{
        console.log('getJoinedRooms:: ');
        const teacher = req.params.teacherid;
        let rooms = await UserChat.find({teacher: teacher}).populate('teacher').populate('room');
        return res.status(200).json({success:true, data:rooms});
    } catch(err){
        console.log('blockRoom:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
}

const joinRoom = async (req,res)=>{
    try{
        console.log('joinRoom:: ');
        const {teacherid, roomid} = req.body;
        let joinedroom = await UserChat.find({teacher: teacherid, room: roomid});
        if(joinedroom && joinedroom.length){
            return res.status(200).json({success:true, message:"Room already joined"});
        }
        const joinPayload = new UserChat({teacher: teacherid, room: roomid});
        await joinPayload.save();
        return res.status(200).json({success:true, message:"Room joined"});
    }catch(err){
        console.log('blockRoom:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
}

const leaveRoom = async (req,res)=>{
    try{
        console.log('leaveRoom:: ');
        const {teacherid, roomid} = req.body;
        await UserChat.deleteOne({teacher: teacherid, room: roomid});
        return res.status(200).json({success:true, message:"Room Left"});
    }catch(err){
        console.log('blockRoom:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
}

const getMessages = async (req,res) =>{
    try{
        console.log('getMessages:: ');
        const room = req.params.roomid;
        const messages = await Message.find({room:room}).populate('teacher').populate('room');
        return res.status(200).json({success:true, data: messages});
        
    }catch(err){
        console.log('blockRoom:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
}

const writeMessage = async (req,res)=>{
    try{
        console.log('writeMessage:: ');
        const messagePayload = new Message({teacher: req.body.teacherid, room: req.body.roomid, message: req.body.message});
        await messagePayload.save();
        return res.status(200).json({success:true, message:"Message Written"});
    }catch(err){
        console.log('blockRoom:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
}

const getAllRooms = async (req,res) => {
    try{
        console.log('getAllRooms:: ');
        const teacher = req.params.teacherid;
        let chatRooms = await ChatRoom.find({});
        let joinedRooms = await UserChat.find({teacher: teacher});
        console.log('getAllRooms:: ', joinedRooms, chatRooms);
        let rooms = chatRooms.map(r => {
            if(joinedRooms.find(jr => String(jr.room) == String(r._id))){
                return {r, joined: true};
            }
            return {r, joined: false};
        })
        return res.status(200).json({success:true, data:rooms});

    }catch(err){
        console.log('blockRoom:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
}

module.exports = {
    getRooms,
    createRoom,
    uploadImg,
    blockRoom,
    getJoinedRooms,
    joinRoom,
    leaveRoom,
    getMessages,
    writeMessage,
    getAllRooms
}