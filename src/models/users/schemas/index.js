import { Schema } from 'mongoose';

export default new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
  },
  name: { type: String },
  status: { type: String, default: 'A', enum: ['A', 'I'] },
  password: {
    type: String,
    required: true,
  },
  hashKey: { type: String },
  modifiedOn: { type: Date, default: new Date() },
  modifiedBy: { type: String },
  createBy: { type: String },
  createdOn: { type: Date, default: new Date() },
}, { versionKey: false });
