require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { feedbackRouter, contentRouter, userRouter, roomsRouter } = require("./routes");
const { filters } = require("./config");
const cors = require('cors');
var path = require('path');

require("./db");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())


app.use(express.static("uploads"));

app.use("/feedback", feedbackRouter);
app.use("/content", contentRouter);
app.use("/user", userRouter);
app.use("/rooms", roomsRouter);
app.use(express.static(path.join(__dirname, 'public-flutter')));

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.get("/filter", (req, res) => {
  res.status(200).json({ success: true, data: filters });
});

app.listen(PORT, (msg, err) => {
  console.log(`Server Listening on Port ${PORT}`);
});
