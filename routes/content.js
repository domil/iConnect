const express = require('express');
const {contentController} = require('../controller');


const contentRouter = express.Router()

contentRouter.get('/',contentController.getContent)

contentRouter.post('/',contentController.uploadImg, contentController.postContent)

module.exports = contentRouter;