const { Content, User } = require('../model');

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

const getContent = async (req, res) => {
    try {
        const { classid, subjectid, unitid } = req.query;
        const query = {status:'allow'};
        if (classid) query.classid = classid;
        if (subjectid) query.subjectid = subjectid;
        if (unitid) query.unitid = unitid;
        console.log('getContent:: query ', query);
        let content = await Content.find(query).populate('teacher');
        res.status(200).send({ success: true, data: content });
    } catch (err) {
        console.log('getContent:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
};

const postContent = async (req, res) => {
    try {
        console.log('postContent:: ', req.body);
        const contentPayload = {
            classid: req.body.classid,
            subjectid: req.body.subjectid,
            teacher: req.body.teacherid,
            unitid: req.body.unitid,
            content: req.body.content,
            imageFileName: req.file ? req.file.path : ''
        }
        console.log('*****', contentPayload)
        const content = new Content(contentPayload);
        await content.save();
        return res.status(200).send({ success: true, message: "Content Created!" });
    } catch (err) {
        console.log('postContent:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
};

const blockContent = async (req, res) => {
    try {
        console.log('postContent:: ', req.body);
        const { teacherid, contentid } = req.body;
        //validate if user is admin
        const teacher = await User.find({ _id: teacherid });
        if (!teacher || !teacher.length || teacher[0].username != 'admin') {
            res.status(401).send({ success: true, message: "Not Authorized!" });
        }
        await Content.updateOne({ _id: contentid }, { status: 'blocked' });
        res.status(200).send({ success: true, message: "Successfully blocked!" });
    } catch (err) {
        console.log('postContent:: error is ', err);
        res.status(500).send({ success: true, message: "Something went wrong" });
    }
}

module.exports = {
    getContent,
    postContent,
    uploadImg,
    blockContent
}