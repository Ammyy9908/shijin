const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const User = require("./model/User");
const port = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://Sumit:2146255sb8@cluster0.0wij2.mongodb.net/loginsystem?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app
  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    //first check is user exists in db with this email address

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User not exists with this email",
      });
    }

    //check if password is correct

    const isPasswordMatched = user.password === password ? true : false;
    if (!isPasswordMatched) {
      return res.status(200).json({
        message: "Username & Password mismatch",
      });
    }

    const resObj = {};
    resObj.user = user.email;
    resObj.id = user._id;

    res.status(200).send({ message: "Welcome user", resObj });
  })
  .post("/register", async (req, res) => {
    const { email, password } = req.body;

    //find a user that match with this email

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(200).json({
        message: "User already exists with email",
      });
    }

    //create a new user

    const newUser = new User({
      email,
      password,
    });

    newUser
      .save()
      .then(() => {
        res.status(200).json({
          message: "User created successfully",
        });
      })
      .catch((e) => {
        res.status(400).json({
          message: "User creation failed",
        });
      });
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
