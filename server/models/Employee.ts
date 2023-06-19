import { Schema, model } from 'mongoose';
import joi from 'joi';
const Employee: Schema = new Schema({ firstName: { type: String }, lastName: { type: String }, hireDate: { type: Date } }, { timestamps: true });

const EmployeeModel = model('Employee', Employee);

const EmployeeValidation = joi.object({ firstName: joi.string().min(6).required(), lastName: joi.string().min(6).required(), hireDate: joi.date().min(Date()) });

export default { EmployeeModel, EmployeeValidation };
