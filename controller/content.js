const {Content} = require('../model');

const {imageStore} = require('../lib');
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
    try{
        const {classid,subjectid,unitid} = req.query;
        const query = {};
        if(classid) query.classid = classid;
        if(subjectid) query.subjectid = subjectid;
        if(unitid) query.unitid = unitid;
        console.log('getContent:: query ', query);
        let content = await Content.find(query);
        res.status(200).send({success:true, data: content});
    }catch(err){
        console.log('getContent:: error is ', err);
        res.status(500).send({success:true, message: "Something went wrong"});
    }
};

const postContent = async (req, res) => {
    try{
        console.log('postContent:: ', req.body);
        const contentPayload = {
            classid: req.body.classid,
            subjectid: req.body.subjectid,
            teacherid: req.body.teacherid,
            unitid: req.body.unitid,
            content: req.body.content,
            imageFileName: req.file ? req.file.path : ''
        }
        const content = new Content(contentPayload);
        await content.save();
        res.status(200).send({success:true, message: "Content Created!"});
    }catch(err){
        console.log('postContent:: error is ', err);
        res.status(500).send({success:true, message: "Something went wrong"});
    }
};


module.exports = {
    getContent,
    postContent,
    uploadImg
}