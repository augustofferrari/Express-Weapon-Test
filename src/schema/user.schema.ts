import Joi from "joi";

export const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  username: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(), //TODO add passwords validators
});

export const UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
