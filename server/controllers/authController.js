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
    const accessToken = jwt.sign(
      { username: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, { httpOnly: true });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = handleLogin;
