const {Feedback} = require('../model');

const getFeedback = async (req, res) => {
    try{
        const teacherid = req.params.teacherid;
        const feedbackid = req.query.id;
        const query = {teacherid:teacherid}
        console.log('getFeedback:: query ', query);
        let feedbacks = await Feedback.find(query);
        res.status(200).send(feedbacks);
    }catch(err){
        console.log('error is ', err);
        res.send('Something went wrong');
    }
};

const postFeedback = async (req, res) => {
    try{
        console.log('postFeedback:: ', req.body);
        const feedback = new Feedback(req.body);
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