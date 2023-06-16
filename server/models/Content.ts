import { Schema, model } from 'mongoose';

const User: Schema = new Schema({ authors: [{ type: Schema.Types.ObjectId, ref: 'Employee' }], title: { type: String } });

export default model('User', User);
