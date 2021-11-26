const express = require("express");
const { contentController } = require("../controller");
const { contentValidation, blockContent } = require("../middleware/validation");

const contentRouter = express.Router();

contentRouter.get("/", contentController.getContent);

contentRouter.post(
  "/",
  contentController.uploadImg,
  contentValidation,
  contentController.postContent
);

contentRouter.put('/block', blockContent, contentController.blockContent);

module.exports = contentRouter;
