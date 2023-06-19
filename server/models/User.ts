import { Schema, model } from 'mongoose';
import joi from 'joi';
const User: Schema = new Schema({ username: { type: String }, password: { type: String } });

const UserModel = model('User', User);

const UserValidation = joi.object({ username: joi.string().min(6).required(), password: joi.string().min(3).required() });

export { UserModel, UserValidation };
