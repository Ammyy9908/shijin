const { model, Schema } = require("mongoose");

const user_schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("user", user_schema);

module.exports = User;
