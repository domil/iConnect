const express = require("express");
const { feedbackController } = require("../controller");
const { feedbackValidation, validationReq } = require("../middleware/validation");

const feedbackRouter = express.Router();

feedbackRouter.get("/", feedbackController.getAllFeedbacks);

feedbackRouter.get("/:teacherid", feedbackController.getFeedback);

feedbackRouter.post("/", feedbackValidation, feedbackController.postFeedback);
feedbackRouter.put("/update",  feedbackController.feedbackUpdate);

module.exports = feedbackRouter;
