import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    movilNumber: { type: String }
}, {timestamps: true})