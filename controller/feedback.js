const {Feedback} = require('../model');

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
}).none();


const getAllFeedbacks = async (req, res) => {
    try{
        const query = {}
        console.log('getFeedbacks:: query ', query);
        let feedbacks = await Feedback.find(query).populate('teacher');
        res.status(200).json({success:true, data: feedbacks});
    }catch(err){
        console.log('error is ', err);
        res.send('Something went wrong');
    }
};

const getFeedback = async (req, res) => {
    try{
        const teacherid = req.params.teacherid;
        const query = {teacher:teacherid}
        console.log('getFeedback:: query ', query);
        let feedbacks = await Feedback.find(query).populate('teacher');
        res.status(200).json({success:true, data: feedbacks});
    }catch(err){
        console.log('error is ', err);
        res.send('Something went wrong');
    }
};

const postFeedback = async (req, res) => {
    try{
        console.log('postFeedback:: ', req.body);
        const feedbackPayload = {
            classid: req.body.classid,
            subjectid: req.body.subjectid,
            teacher: req.body.teacherid,
            unitid: req.body.unitid,
            team:  "Content",
            status: "Pending",
            feedbackText: req.body.feedbackText
        }
        const feedback = new Feedback(feedbackPayload);
        await feedback.save();
        res.status(200).send({success:true, message: "Feedback Submitted"});
    }catch(err){
        console.log('error is ', err);
        res.send('Something went wrong');
    }
};

const feedbackUpdate = async (req, res) => {
    try{
        const feedbackId = req.body.feedbackid;
        console.log('postFeedback:: ', req.body);
        const payloadToUpdate = {};
        if(req.body.comments) payloadToUpdate.comments = req.body.comments;
        if(req.body.resolved) payloadToUpdate.status = "Resolved";
        if(req.body.reviewed) payloadToUpdate.status = "Reviewed";
        await Feedback.updateOne({_id:feedbackId}, payloadToUpdate);
        res.status(200).send({success:true, message: "Feedback Updated"});
    }catch(err){
        console.log('error is ', err);
        res.send('Something went wrong');
    }
};


module.exports = {
    getAllFeedbacks,
    getFeedback,
    postFeedback,
    feedbackUpdate,
    uploadImg
}