import { Schema, model } from 'mongoose';

const User: Schema = new Schema({ username: { type: String }, password: { type: String } });

export default model('User', User);
