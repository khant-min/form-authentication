require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

app.all("*", (req, res) => {
  console.log(req.url);
  console.log(req.type);
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "err.html"));
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("DB is connected");
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});
