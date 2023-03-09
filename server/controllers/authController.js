const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and passwords are required" });

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    res.status(200).json({ success: "Login successfully" });
  } else {
    res.sendStatus(401);
  }
};

module.exports = handleLogin;
