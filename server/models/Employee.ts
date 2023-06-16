import { Schema, model } from 'mongoose';

const User: Schema = new Schema({ firstName: { type: String }, lastName: { type: String }, hireDate: { type: Date } });

export default model('User', User);
