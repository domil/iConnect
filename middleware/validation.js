
const contentValidation = (req, res, next) => {

  const { classid, subjectid, teacherid, unitid, content } = req.body;
  if (!classid || !subjectid || !teacherid || !unitid || !content) {
    return res.status(401).json({ success: true, message: "Invalid Input" });
  }
  return next();
};

const feedbackValidation = (req, res, next) => {
  const { classid, subjectid, teacherid, unitid, feedbackText } = req.body;
  if (!classid || !subjectid || !teacherid || !unitid || !feedbackText) {
    return res.status(401).json({ success: true, message: "Invalid Input" });
  }
  return next();
};

const blockContent = (req, res, next) => {
  const { teacherid, contentid } = req.body;
  if (!teacherid || !contentid) {
    res.status(401).json({ success: true, message: "Invalid Input" });
  }
  return next();
};

module.exports = {
  contentValidation,
  feedbackValidation,
  blockContent,
};
