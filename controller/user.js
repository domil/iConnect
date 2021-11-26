const { User } = require("../model");

const getTeacher = async (req, res) => {
  try {
    const username = req.body.username;
    let teacher = await User.find({username: username});
    console.log('getTeacher:: ', username, teacher);

    if (!teacher || !teacher.length) {
      const userPayload = {
        username: username,
      };
      const user = new User(userPayload);
      await user.save();
      teacher = await User.find({username: username});
      return res.status(200).send({ success: true, data: teacher[0], admin: username == 'admin' });
    }
    return res.status(200).send({ success: true, data: teacher[0], admin: username == 'admin' });
  } catch (err) {
    console.log("error is ", err);
    res.send("Something went wrong");
  }
};

module.exports = {
  getTeacher,
};
