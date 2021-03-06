import { Document } from 'mongoose';

export interface User extends Document {
    readonly username: string
    readonly firstName: string
    readonly lastName: string
    readonly password: string
    readonly phoneNumber: string
    readonly movilNumber: string
}