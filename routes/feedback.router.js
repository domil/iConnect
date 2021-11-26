const express = require('express');
const {feedbackController} = require('../controller');

const feedbackRouter = express.Router()

feedbackRouter.get('/:teacherid',feedbackController.getFeedback)

feedbackRouter.post('/',feedbackController.postFeedback)

module.exports = feedbackRouter;