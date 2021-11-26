const {Feedback} = require('../model');

const getFeedback = async (req, res) => {
    try{
        const teacherid = req.params.teacherid;
        const feedbackid = req.query.id;
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

module.exports = {
    getFeedback,
    postFeedback
}