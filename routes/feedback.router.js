const express = require("express");
const { feedbackController } = require("../controller");
const { feedbackValidation, validationReq } = require("../middleware/validation");

const feedbackRouter = express.Router();

feedbackRouter.get("/:teacherid", feedbackController.getFeedback);

feedbackRouter.post("/", feedbackValidation, feedbackController.postFeedback);

module.exports = feedbackRouter;
