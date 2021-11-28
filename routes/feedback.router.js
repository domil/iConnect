const express = require("express");
const { feedbackController } = require("../controller");
const { feedbackValidation } = require("../middleware/validation");

const feedbackRouter = express.Router();

feedbackRouter.get("/", feedbackController.getAllFeedbacks);

feedbackRouter.get("/:teacherid", feedbackController.getFeedback);

feedbackRouter.post("/", feedbackController.uploadImg, feedbackValidation, feedbackController.postFeedback);
feedbackRouter.put("/update", feedbackController.feedbackUpdate);

module.exports = feedbackRouter;
