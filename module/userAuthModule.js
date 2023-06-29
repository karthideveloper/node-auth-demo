const mongoose = require("mongoose");
const Joi = require("joi");
const userRegisterSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("user", userRegisterSchema);

const validateUser = (userReg) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(5).required(),
  });
  const Validation = schema.validate(userReg);
  return Validation.error;
};

exports.validate = validateUser;

exports.User = User;
