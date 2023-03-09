const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  console.log("req: ", req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: "Username, email and passwords are required" });

  const duplicate = await User.findOne({ email }).exec();
  console.log("du", duplicate);
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const result = await User.create({
      username,
      email,
      password: hashedPwd,
    });

    console.log(result);
    res.status(201).json({ success: `New user ${username} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;
