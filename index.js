require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { feedbackRouter, contentRouter, userRouter } = require("./routes");
const { filters } = require("./config");

require("./db");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("uploads"));

app.use("/feedback", feedbackRouter);
app.use("/content", contentRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.get("/filter", (req, res) => {
  res.status(200).json({ success: true, data: filters });
});

app.listen(PORT, (msg, err) => {
  console.log(`Server Listening on Port ${PORT}`);
});
