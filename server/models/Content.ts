import { Schema, model } from 'mongoose';
import joi from 'joi';
const Content: Schema = new Schema({ authors: [{ type: Schema.Types.ObjectId, ref: 'Employee' }], title: { type: String } });

const ContentModel = model('Content', Content);
const ContentValidation = joi.object({ authors: joi.array().min(1), title: joi.string().min(2).required() });

export default { ContentModel, ContentValidation };
